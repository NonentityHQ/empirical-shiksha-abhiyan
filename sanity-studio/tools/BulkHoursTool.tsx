import {useMemo, useState, type CSSProperties} from 'react'
import {useClient} from 'sanity'
import {Button, Card, Heading, Text} from '@sanity/ui'
import {UsersIcon} from '@sanity/icons/Users'

type Volunteer = {_id: string; name: string; role?: string; category?: string}
const apiVersion = '2026-07-01'
const now = new Date()
const today = new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
const inputStyle: CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1px solid var(--card-border-color)',
  borderRadius: 6, background: 'var(--card-bg-color)', color: 'var(--card-fg-color)',
}

export function BulkHoursTool() {
  const client = useClient({apiVersion})
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(today)
  const [hours, setHours] = useState('1')
  const [notes, setNotes] = useState('')
  const [driveId, setDriveId] = useState('')

  async function loadVolunteers() {
    setLoading(true); setError('')
    try {
      const result = await client.fetch<Volunteer[]>(
        `*[_type == "volunteer" && active == true] | order(name asc){_id,name,role,category}`
      )
      setVolunteers(result); setLoaded(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load students.')
    } finally { setLoading(false) }
  }

  const filtered = useMemo(() => volunteers.filter((v) =>
    `${v.name} ${v.role || ''} ${v.category || ''}`.toLowerCase().includes(search.toLowerCase())
  ), [volunteers, search])

  function toggle(id: string, checked: boolean) {
    setSelected((old) => checked ? [...new Set([...old, id])] : old.filter((x) => x !== id))
  }

  function selectVisible() {
    const ids = filtered.map((v) => v._id)
    setSelected((old) => [...new Set([...old, ...ids])])
  }

  async function saveDrive() {
    setError(''); setSuccess('')
    const amount = Number(hours)
    if (!title.trim()) return setError('Pehle drive ka naam likho.')
    if (!date) return setError('Drive ki date select karo.')
    if (!Number.isFinite(amount) || amount <= 0 || amount > 24) return setError('Hours 0 se zyada aur 24 ya usse kam hone chahiye.')
    if (!selected.length) return setError('Kam se kam ek student select karo.')

    setSaving(true)
    // Retain this ID after partial failure. Retrying creates no duplicate ledger entries.
    const id = driveId || `drive-${crypto.randomUUID().replaceAll('-', '')}`
    setDriveId(id)
    try {
      await client.createIfNotExists({
        _id: id, _type: 'volunteerDrive', title: title.trim(), date, defaultHours: amount,
        notes, status: 'processing', participantCount: selected.length, totalHours: amount * selected.length,
      })

      const docs = selected.map((volunteerId) => ({
        _id: `hour-${id}-${volunteerId.replace(/[^a-zA-Z0-9_-]/g, '-')}`.slice(0, 220),
        _type: 'volunteerHourEntry' as const,
        volunteer: {_type: 'reference' as const, _ref: volunteerId},
        drive: {_type: 'reference' as const, _ref: id},
        date, activityTitle: title.trim(), hours: amount, entryType: 'add',
        reason: notes || 'Bulk hours entry',
      }))

      for (let i = 0; i < docs.length; i += 60) {
        let tx = client.transaction()
        for (const doc of docs.slice(i, i + 60)) tx = tx.createIfNotExists(doc)
        await tx.commit()
      }
      await client.patch(id).set({status: 'complete'}).commit()
      setSuccess(`Done! ${selected.length} students ke ${amount} hours add ho gaye. Total ${amount * selected.length} hours.`)
      setSelected([]); setTitle(''); setNotes(''); setDriveId('')
    } catch (e) {
      setError(`Save complete nahi hua. Same form se dobara Confirm/Retry karo; existing entries duplicate nahi hongi. ${e instanceof Error ? e.message : ''}`)
    } finally { setSaving(false) }
  }

  return (
    <div style={{padding: 32, maxWidth: 1040, margin: '0 auto', display: 'grid', gap: 20}}>
      <div style={{display: 'grid', gap: 6}}>
        <Heading size={3}>Bulk Student Hours</Heading>
        <Text muted>Ek drive mein jitne students ne kaam kiya, un sabke hours ek baar mein add karo.</Text>
      </div>
      <Card padding={4} radius={3} border>
        <div style={{display: 'grid', gap: 14}}>
          <Heading size={2}>1. Drive ki details</Heading>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 12}}>
            <label style={{display:'grid',gap:6}}>Drive / activity ka naam<input value={title} disabled={Boolean(driveId)} onChange={(e) => setTitle(e.currentTarget.value)} placeholder="e.g. Aaj ki Swachhta Drive" style={inputStyle}/></label>
            <label style={{display:'grid',gap:6}}>Date<input type="date" value={date} disabled={Boolean(driveId)} onChange={(e) => setDate(e.currentTarget.value)} style={inputStyle}/></label>
            <label style={{display:'grid',gap:6}}>Har student ko kitne hours?<input type="number" min="0.25" max="24" step="0.25" value={hours} disabled={Boolean(driveId)} onChange={(e) => setHours(e.currentTarget.value)} style={inputStyle}/></label>
            <label style={{display:'grid',gap:6}}>Short note (optional)<input value={notes} disabled={Boolean(driveId)} onChange={(e) => setNotes(e.currentTarget.value)} placeholder="What did the team do?" style={inputStyle}/></label>
          </div>
        </div>
      </Card>
      <Card padding={4} radius={3} border>
        <div style={{display: 'grid', gap: 14}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
            <Heading size={2}>2. Students select karo</Heading>
            <Button icon={UsersIcon} text={loaded ? 'Refresh students' : 'Load students'} onClick={loadVolunteers} loading={loading}/>
          </div>
          {loaded && <>
            <Text size={1} muted>{volunteers.length} active students · {selected.length} selected</Text>
            <input value={search} onChange={(e) => setSearch(e.currentTarget.value)} placeholder="Naam ya category se search karo" style={inputStyle}/>
            <Button mode="ghost" text={`Select all ${filtered.length} visible`} onClick={selectVisible} disabled={!filtered.length || Boolean(driveId)}/>
            <div style={{maxHeight: 360, overflow: 'auto', border: '1px solid var(--card-border-color)', borderRadius: 8, padding: 8}}>
              {filtered.map((v) => <label key={v._id} style={{display:'flex',alignItems:'center',gap:12,padding:10,cursor:'pointer'}}>
                <input type="checkbox" checked={selected.includes(v._id)} disabled={Boolean(driveId)} onChange={(e) => toggle(v._id, e.currentTarget.checked)}/>
                <span><strong>{v.name}</strong><br/><small style={{color:'var(--card-muted-fg-color)'}}>{[v.role, v.category].filter(Boolean).join(' · ')}</small></span>
              </label>)}
              {!filtered.length && <Text muted>No matching active students.</Text>}
            </div>
          </>}
          {!loaded && <Text muted>Load students par click karo. Active students ki list yahan aa jayegi.</Text>}
        </div>
      </Card>
      <Card padding={4} radius={3} border>
        <div style={{display:'grid',gap:12}}>
          <Heading size={2}>3. Review & save</Heading>
          <Text>Selected students: <strong>{selected.length}</strong></Text>
          <Text>Hours per student: <strong>{Number(hours) || 0}</strong></Text>
          <Heading size={3}>Total hours to add: {(Number(hours) || 0) * selected.length}</Heading>
          <Button tone="positive" text={saving ? 'Saving…' : 'Confirm & add hours'} onClick={saveDrive} disabled={saving || !loaded}/>
          {error && <div role="alert" style={{padding:12,borderRadius:8,background:'var(--card-critical-bg-color)',color:'var(--card-critical-fg-color)'}}>{error}</div>}
          {success && <div role="status" style={{padding:12,borderRadius:8,background:'var(--card-positive-bg-color)',color:'var(--card-positive-fg-color)'}}>{success}</div>}
        </div>
      </Card>
      <Text size={1} muted>Safety: Each student receives one auditable entry linked to this drive. If a save is interrupted, retrying the same form does not duplicate entries. Corrections should be made as separate adjustment entries with a reason.</Text>
    </div>
  )
}
