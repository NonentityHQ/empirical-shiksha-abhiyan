import { useState } from "react";
import { AIcon } from "../icons";
import type { Page } from "../shared";
import { CountUp } from "../ui";
import { MILESTONES, MONTHS, hoursOf, pctOf, rankOf, ranked, starBySlug } from "../stars-data";
import { Avatar, Leaderboard, Ring, Script } from "./Stars";

const INK = "#1F2A44";
const DEEP = "#17605C";
const TABS: [string, string][] = [["Overview", "grid"], ["Contribution", "calendar"], ["Achievements", "trophy"], ["Badges", "shield"], ["Impact", "leaf"]];

export default function StarDetail({ id, go, openStar }: { id: string; go: (p: Page) => void; openStar: (slug: string) => void }) {
  const s = starBySlug(id);
  const [tab, setTab] = useState("Overview");
  if (!s) {
    return (
      <div className="mx-auto max-w-[700px] px-5 py-24 text-center">
        <h1 className="font-display text-4xl font-extrabold" style={{ color: INK }}>Star not found</h1>
        <p className="mt-3 text-slate-600">We could not find this profile.</p>
        <button onClick={() => go("stars")} className="press btn-solid mt-6 rounded-full px-6 py-3 font-bold">Back to Our Stars</button>
      </div>
    );
  }
  const list = ranked();
  const rank = rankOf(s);
  const hours = hoursOf(s);
  const pct = pctOf(s);
  const first = s.name.split(" ")[0];
  const max = Math.max(...s.monthly);
  const show = (...t: string[]) => tab === "Overview" || t.includes(tab);
  const showGlance = show("Achievements"), showMonthly = show("Contribution");
  const twoUp = showGlance && showMonthly; // only Overview has both side by side
  const showBadges = show("Badges"), showRecent = show("Contribution", "Impact");
  const rowTwo = showBadges && showRecent;
  const nextIdx = MILESTONES.findIndex((m) => hours < m.hrs);
  const wrap = "mx-auto max-w-[1180px] px-4 sm:px-7";
  const crumb = "inline-flex items-center gap-2 rounded-lg border-2 border-[#1F2A44] bg-[#FFFDF7] px-3.5 py-2 text-[14.5px] font-semibold";

  return (
    <div className="overflow-hidden pb-0" style={{ background: "#FBEBD0" }}>
      <div className={`${wrap} pt-5`}>
        <nav className={crumb} aria-label="Breadcrumb" style={{ color: INK }}>
          <button onClick={() => go("home")} aria-label="Home" className="text-slate-600 hover:text-[#17605C]"><AIcon n="home" s={18} /></button>›
          <button onClick={() => go("stars")} className="text-slate-600 hover:underline">Our Stars</button>›
          <b>{s.name}</b>
        </nav>
      </div>

      {/* ===== Profile hero ===== */}
      <section data-parallax className={`${wrap} mt-6 grid items-center gap-6 lg:grid-cols-[1.15fr_1fr]`}>
        <div className="grid items-center gap-4 sm:grid-cols-[260px_1fr]">
          <div className="float-3d relative mx-auto h-[290px] w-[260px]" data-depth="10" data-scroll-y="30">
            <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full" aria-hidden><path d="M60 250C20 190 40 90 120 50c60-30 130-10 140 50-40-10-80 10-90 50 20 20 10 70-40 90-40 14-60 14-70 10z" fill={s.color} opacity=".9" /><path d="M30 210C10 160 40 100 90 80" stroke="#fff" strokeWidth="6" fill="none" opacity=".5" strokeLinecap="round" /></svg>
            {s.photo ? <img src={s.photo} alt={s.name} className="absolute bottom-0 left-1/2 h-[96%] -translate-x-1/2 object-contain object-bottom" /> : <span className="absolute inset-0 grid place-items-center"><Avatar s={s} size={170} ring /></span>}
            <span className="float-slow absolute -right-1 -top-3 text-[#EE9B13]"><AIcon n="crown" s={52} duo /></span>
          </div>
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-md border-2 border-[#1F2A44] bg-[#D8501F] px-3.5 py-1 text-[14px] font-bold text-white"><AIcon n="star" s={16} />{rank === 1 ? "Top Contributor" : `Star #${rank}`}</span>
            <h1 className="mt-3 font-display text-[44px] font-extrabold leading-[1.02] sm:text-[52px]" style={{ color: INK }}>{s.name}</h1>
            <p className="mt-2 flex items-center gap-2 text-[19px] font-bold" style={{ color: s.color }}><AIcon n={s.roleIcon} s={26} />{s.role}</p>
            <p className="mt-3 flex gap-2 text-[17.5px] leading-[1.5]" style={{ color: INK }}><span className="font-display text-4xl font-extrabold leading-none text-[#D8501F]">“</span>{s.quote}”</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="card-soft inline-flex items-center gap-2 px-3.5 py-2 text-[14px] font-semibold" style={{ color: INK }}><span className="text-[#17605C]"><AIcon n="calendar" s={22} /></span>Since<br />{s.since}</span>
              <span className="card-soft inline-flex items-center gap-2 px-3.5 py-2 text-[14px] font-semibold" style={{ color: INK }}><span className="text-[#17605C]"><AIcon n="cap" s={22} /></span>{s.years}</span>
            </div>
          </div>
        </div>

        <div className="card-print mx-auto w-full max-w-[600px] p-5 lg:mx-0 lg:justify-self-end">
          <div className="grid items-center gap-4 sm:grid-cols-[auto_1fr_1fr]">
            <Ring pct={pct} size={128} stroke={13} color="#3A7D44"><b className="font-display text-[30px] font-extrabold leading-none" style={{ color: INK }}><CountUp value={pct + "%"} /><span className="block text-[13px] font-semibold text-slate-600">Completed</span></b></Ring>
            <div className="flex items-center gap-2.5"><span className="text-[#3A7D44]"><AIcon n="clock" s={34} /></span><span><b className="block font-display text-[26px] font-extrabold leading-none" style={{ color: INK }}><CountUp value={hours + " hrs"} /></b><span className="text-[14px] font-semibold text-slate-600">Contributed</span></span></div>
            <div className="flex items-center gap-2.5 sm:border-l-2 sm:border-dashed sm:border-[#E9DCC0] sm:pl-4"><span className="text-[#EE9B13]"><AIcon n="target" s={34} /></span><span><b className="block font-display text-[26px] font-extrabold leading-none" style={{ color: INK }}><CountUp value={s.target + " hrs"} /></b><span className="text-[14px] font-semibold text-slate-600">Yearly Target</span></span></div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border-2 border-[#1F2A44] bg-[#F6EAD3] p-3 sm:grid-cols-4">
            {s.impact.map((m, i) => (
              <div key={m.label} className={`flex flex-col items-center text-center ${i ? "sm:border-l-2 sm:border-dashed sm:border-[#1F2A44]/30" : ""}`}>
                <span className="text-[#3A7D44]"><AIcon n={m.icon} s={30} duo /></span>
                <b className="font-display text-[22px] font-extrabold leading-none" style={{ color: INK }}><CountUp value={m.value} /></b>
                <span className="mt-0.5 text-[12.5px] font-semibold leading-tight text-slate-600">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Tabs + body ===== */}
      <section className={`${wrap} mt-8 grid items-start gap-6 lg:grid-cols-[1fr_310px]`}>
        <div className="min-w-0 space-y-5">
          <div role="tablist" className="card-soft flex flex-wrap gap-1 p-1.5">
            {TABS.map(([l, ic]) => (
              <button key={l} role="tab" aria-selected={tab === l} onClick={() => setTab(l)} className={`press inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[15px] font-bold transition ${tab === l ? "bg-[#17605C] text-white" : "text-[#1F2A44] hover:bg-[#F6EAD3]"}`}><AIcon n={ic} s={19} />{l}</button>
            ))}
          </div>

          <div key={tab} className="space-y-5">
            {(showGlance || showMonthly) && (
              <div className={`grid gap-5 ${twoUp ? "lg:grid-cols-[.8fr_1.6fr]" : ""}`}>
                {show("Achievements") && (
                  <section className="card-print p-5">
                    <h3 className="flex items-center gap-2 font-display text-[20px] font-extrabold" style={{ color: INK }}><span className="text-[#3A7D44]"><AIcon n="trophy" s={24} duo /></span>At a Glance</h3>
                    <ul className={`mt-3 ${twoUp ? "space-y-3" : "grid grid-cols-2 gap-4 sm:grid-cols-4"}`}>
                      {([["trophy", "#EE9B13", `#${rank}`, "on Leaderboard"], ["bolt", "#EE9B13", `${s.streak} Months`, "Current Streak"], ["crown", "#EE9B13", `${s.longest} Months`, "Longest Streak"], ["calendar", "#3A7D44", `${hours} hrs`, "Total Contribution"]] as const).map(([ic, c, v, l]) => (
                        <li key={l} className="flex items-center gap-3"><span style={{ color: c }}><AIcon n={ic} s={32} duo /></span><span><b className="block font-display text-[18px] font-extrabold leading-tight" style={{ color: INK }}><CountUp value={v} /></b><span className="text-[13.5px] font-semibold text-slate-600">{l}</span></span></li>
                      ))}
                    </ul>
                  </section>
                )}
                {show("Contribution") && (
                  <section className="card-print p-5">
                    <h3 className="flex items-center gap-2 font-display text-[20px] font-extrabold" style={{ color: INK }}><span className="text-[#3A7D44]"><AIcon n="chart" s={24} /></span>Monthly Contribution <span className="text-[14px] font-semibold text-slate-500">(Hours)</span></h3>
                    <div className={`mt-3 flex items-end gap-1.5 ${twoUp ? "h-[190px]" : "h-[240px] sm:gap-3"}`} role="img" aria-label={`Monthly hours for ${s.name}`}>
                      {s.monthly.map((v, i) => (
                        <div key={i} className="flex h-full flex-1 flex-col justify-end text-center">
                          <span className="text-[11.5px] font-bold" style={{ color: INK }}><CountUp value={v + "h"} /></span>
                          <span className="bar-grow mt-1 block rounded-t-md border-2 border-b-0 border-[#1F2A44]" style={{ height: `${(v / max) * 78}%`, background: i === s.monthly.length - 1 ? "#3A7D44" : "#9CC98A", animationDelay: i * 70 + "ms" }} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-1 flex gap-1.5 border-t-2 border-[#1F2A44] pt-1 text-center text-[11.5px] font-semibold text-slate-600">{MONTHS.map((m) => <span key={m} className="flex-1">{m}</span>)}</div>
                  </section>
                )}
                {show("Achievements") && (
                  <section className={`card-print p-5 ${twoUp ? "lg:col-span-2" : ""}`}>
                    <h3 className="flex items-center gap-2 font-display text-[20px] font-extrabold" style={{ color: INK }}><span className="text-[#3A7D44]"><AIcon n="leaf" s={24} /></span>Milestone Journey</h3>
                    <ol className="relative mt-5 grid grid-cols-5 gap-3 text-center">
                      <span className="absolute left-[10%] right-[10%] top-[18px] border-t-[3px] border-[#3A7D44]" aria-hidden />
                      {MILESTONES.map((m, i) => {
                        const done = hours >= m.hrs, cur = i === nextIdx;
                        return (
                          <li key={m.hrs} className="relative flex flex-col items-center">
                            <span className={`grid h-9 w-9 place-items-center rounded-full border-2 border-[#1F2A44] ${done ? "bg-[#3A7D44] text-white" : cur ? "bg-[#EE9B13] text-[#1F2A44]" : "bg-[#E9DCC0] text-slate-500"}`}><AIcon n={done ? "check" : cur ? "star" : m.icon} s={18} /></span>
                            <b className="mt-1.5 text-[13px] font-extrabold leading-tight" style={{ color: INK }}>{m.hrs} hrs</b>
                            <span className="text-[12.5px] font-semibold leading-tight text-slate-600">{m.short}</span>
                          </li>
                        );
                      })}
                    </ol>
                    <p className="mt-4 text-[13.5px] font-semibold text-slate-600">{nextIdx === -1 ? "Every milestone unlocked!" : `${MILESTONES[nextIdx].hrs - hours} more hours to reach ${MILESTONES[nextIdx].name}.`}</p>
                  </section>
                )}
              </div>
            )}

            {(showBadges || showRecent) && (
              <div className={`grid gap-5 ${rowTwo ? "lg:grid-cols-2" : ""}`}>
                {showBadges && (
                  <section className="card-print p-5">
                    <h3 className="flex items-center gap-2 font-display text-[20px] font-extrabold" style={{ color: INK }}><span className="text-[#EE9B13]"><AIcon n="shield" s={26} duo /></span>Badges Earned ({s.badges.length})</h3>
                    <ul className={`mt-4 ${rowTwo ? "flex flex-wrap gap-4" : "grid grid-cols-3 gap-5 sm:grid-cols-4 lg:grid-cols-6"}`}>
                      {s.badges.map((b) => (
                        <li key={b.name} className={`flex flex-col items-center text-center ${rowTwo ? "w-[78px]" : ""}`}>
                          <span className="badge-3d relative grid h-[64px] w-[56px] place-items-center"><svg viewBox="0 0 60 68" className="absolute inset-0 h-full w-full" aria-hidden><path d="M30 3l25 8v21c0 16-10 27-25 33C15 59 5 48 5 32V11z" fill={b.color} stroke="#1F2A44" strokeWidth="3" strokeLinejoin="round" /></svg><span className="pop-icon relative text-white"><AIcon n={b.icon} s={26} /></span></span>
                          <span className="mt-1.5 text-[12.5px] font-bold leading-tight" style={{ color: INK }}>{b.name}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
                {showRecent && (
                  <section className="card-print p-5">
                    <h3 className="flex items-center gap-2 font-display text-[20px] font-extrabold" style={{ color: INK }}><span className="text-[#3A7D44]"><AIcon n="calendar" s={24} /></span>Recent Contributions</h3>
                    <ul className="mt-3 divide-y-2 divide-dashed divide-[#E9DCC0]">
                      {s.recent.map((r) => (
                        <li key={r.title} className="flex items-center gap-3 py-2.5">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E4EED8] text-[#3A7D44]"><AIcon n={r.icon} s={20} duo /></span>
                          <span className="min-w-0 flex-1 text-[14.5px] font-bold leading-tight" style={{ color: INK }}>{r.title}</span>
                          <span className="rounded-md bg-[#E4EED8] px-2 py-0.5 text-[13px] font-extrabold text-[#2d6a38]">+{r.hrs} hrs</span>
                          <span className="hidden text-[12.5px] font-semibold text-slate-500 sm:block">{r.date}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}

            {tab === "Impact" && (
              <section className="card-print p-6">
                <h3 className="font-display text-[24px] font-extrabold" style={{ color: INK }}>{first}&rsquo;s impact on the ground</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {s.impact.map((m) => (
                    <div key={m.label} className="card-soft flex flex-col items-center p-4 text-center">
                      <span className="text-[#3A7D44]"><AIcon n={m.icon} s={40} duo /></span>
                      <b className="mt-1 font-display text-[30px] font-extrabold leading-none" style={{ color: INK }}><CountUp value={m.value} /></b>
                      <span className="mt-1 text-[14px] font-semibold text-slate-600">{m.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <aside className="space-y-5">
          <Leaderboard list={list} openStar={openStar} current={s.slug} title="Leaderboard" sub="Top 5" bars={false} />
          <section className="card-print relative overflow-hidden p-5 pb-16" style={{ background: s.tint }}>
            <h3 className="font-display text-[26px] font-extrabold leading-tight" style={{ color: INK }}><span className="mr-1 text-[#D8501F]">“</span><Script className="text-[28px]" line={false}>{`Be like ${first}!`}</Script></h3>
            <p className="mt-3 text-[16.5px] leading-[1.5]" style={{ color: INK }}>{s.be}</p>
            <svg viewBox="0 0 160 70" className="absolute bottom-0 right-0 h-[70px] w-[160px]" aria-hidden><path d="M0 70c20-26 70-28 100-14 20 8 40 8 60-4v18z" fill="#8A4B2A" /><path d="M120 56V28" stroke="#3A7D44" strokeWidth="4" strokeLinecap="round" /><path d="M120 34c-8-10-6-20 4-24 4 10 2 20-4 24zM120 40c8-8 18-8 24-2-6 8-16 8-24 2z" fill="#58a844" /></svg>
          </section>
        </aside>
      </section>

      <section className={`${wrap} mt-8 pb-12`}>
        <div data-reveal-me className="card-print flex flex-col items-center gap-5 p-5 sm:flex-row sm:px-8">
          <svg viewBox="0 0 160 130" className="float-slow h-[110px] w-[130px] shrink-0" aria-hidden><path d="M30 80c-16-8-20-30-10-46M130 80c16-8 20-30 10-46" stroke="#EE9B13" strokeWidth="4" fill="none" strokeLinecap="round" /><path d="M50 14h60v30c0 18-12 30-30 30S50 62 50 44z" fill="#F5B82E" stroke="#1F2A44" strokeWidth="3" /><path d="M50 22H34c0 14 6 24 18 26M110 22h16c0 14-6 24-18 26" fill="none" stroke="#1F2A44" strokeWidth="3" /><rect x="70" y="74" width="20" height="16" fill="#D99A12" stroke="#1F2A44" strokeWidth="3" /><rect x="52" y="90" width="56" height="14" rx="3" fill="#F4B93E" stroke="#1F2A44" strokeWidth="3" /></svg>
          <div className="text-center sm:text-left"><h2 className="font-display text-[28px] font-extrabold leading-tight" style={{ color: INK }}>You can be the</h2><Script className="text-[40px]" line={false}>Next Star!</Script></div>
          <span className="hidden h-16 w-px bg-[#1F2A44]/30 sm:block" />
          <p className="flex-1 text-center text-[16.5px] leading-[1.5] sm:text-left" style={{ color: INK }}>Join the movement, contribute your time, complete milestones, earn badges and get featured here.</p>
          <button onClick={() => go("contact")} className="press inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 text-[16px] font-bold text-white shadow-lg" style={{ background: DEEP }}>Join as a Volunteer <AIcon n="arrow" s={18} /></button>
        </div>
      </section>
    </div>
  );
}
