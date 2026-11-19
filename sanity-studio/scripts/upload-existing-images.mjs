import {createClient} from '@sanity/client'
import {createReadStream, existsSync, readdirSync, writeFileSync} from 'node:fs'
import {fileURLToPath} from 'node:url'
import path from 'node:path'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!projectId || projectId === 'YOUR_PROJECT_ID' || !token) {
  throw new Error('Set SANITY_STUDIO_PROJECT_ID and SANITY_API_TOKEN in sanity-studio/.env before uploading.')
}

const here = path.dirname(fileURLToPath(import.meta.url))
const imageDir = path.resolve(here, '../../public/images')
if (!existsSync(imageDir)) throw new Error(`Image folder not found: ${imageDir}`)

const client = createClient({projectId, dataset, apiVersion: '2026-07-01', useCdn: false, token})
const files = readdirSync(imageDir).filter((name) => /\.(png|jpe?g|webp|gif|avif)$/i.test(name)).sort()
const mapping = {}

for (const filename of files) {
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id,url}',
    {filename},
  )
  if (existing?._id) {
    mapping[filename] = {_id: existing._id, url: existing.url, reused: true}
    console.log(`Already uploaded: ${filename}`)
    continue
  }

  const asset = await client.assets.upload('image', createReadStream(path.join(imageDir, filename)), {
    filename,
    title: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    source: {name: 'Empirical Shiksha website migration', id: filename},
  })
  mapping[filename] = {_id: asset._id, url: asset.url, reused: false}
  console.log(`Uploaded: ${filename}`)
}

const output = path.resolve(here, '../image-asset-map.json')
writeFileSync(output, JSON.stringify(mapping, null, 2))
console.log(`\nFinished. Asset mapping saved to ${output}`)
