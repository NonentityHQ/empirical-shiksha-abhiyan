import { useState } from "react";
import { Eyebrow, PageHero, SunArc } from "../shared";

type Doc = { title: string; date: string; desc: string; kind: string; status: "sample" | "upcoming" };
const YEARS: Record<string, Doc[]> = {
  "FY 2026–27": [
    { title: "Annual Financial Statement", date: "To be published", desc: "Year-end summary of income and expenditure for the first registered financial year.", kind: "Annual Report", status: "upcoming" },
    { title: "Quarterly Expense Report — Q2", date: "Sample entry", desc: "Itemised record of expenses for cleanliness drives and education materials.", kind: "Expense Report", status: "sample" },
    { title: "Quarterly Expense Report — Q1", date: "Sample entry", desc: "Expenses following official registration on 13 July 2026.", kind: "Expense Report", status: "sample" },
  ],
  "FY 2025–26": [
    { title: "Founder-funded activity summary", date: "Sample entry", desc: "Summary of founder-funded spending before registration.", kind: "Summary", status: "sample" },
  ],
};

export default function Reports() {
  const years = Object.keys(YEARS);
  const [fy, setFy] = useState(years[0]);
  const [sel, setSel] = useState<Doc>(YEARS[years[0]][0]);

  return (
    <>
      <PageHero eyebrow="Financial Reports" title={<>Open books, <span className="text-flame">clear trust</span></>} sub="We are fully self-funded by our founders and do not ask for donations. We publish our reports because we believe every community organisation should be open about how it works." img="images/volunteers.jpg" />

      <section className="max-w-7xl mx-auto px-5 py-14">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "Self-funded", d: "All activities are funded by the founders, Rahul Geete and Jayram Malakar.", c: "#f2611c" },
            { t: "No fundraising", d: "This website does not request or accept donations.", c: "#1f5fd1" },
            { t: "Published by year", d: "Reports are organised by financial year and released as they are finalised.", c: "#3f9a3a" },
          ].map((x) => (
            <div key={x.t} className="rounded-[28px] bg-white ring-1 ring-orange-100 p-7">
              <div className="w-10 h-10 rounded-t-full rounded-b-xl" style={{ background: x.c }} />
              <h3 className="mt-4 text-2xl font-extrabold text-ink">{x.t}</h3>
              <p className="text-slate-600 mt-1">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 pb-20">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-bold text-ink mr-2">Financial year:</span>
          {years.map((y) => (
            <button key={y} onClick={() => { setFy(y); setSel(YEARS[y][0]); }} className={`px-5 py-2.5 rounded-full font-bold text-sm ${fy === y ? "bg-royal text-white" : "bg-white ring-1 ring-slate-200 text-ink"}`}>{y}</button>
          ))}
        </div>

        <div className="mt-8 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <div className="relative pl-8">
              <div className="absolute left-3 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-saffron to-royal" />
              <div className="space-y-4">
                {YEARS[fy].map((d) => (
                  <button key={d.title} onClick={() => setSel(d)} className={`relative w-full text-left rounded-3xl p-5 transition ${sel === d ? "bg-white shadow-lg ring-2 ring-saffron" : "bg-white ring-1 ring-slate-200 hover:ring-saffron/50"}`}>
                    <span className={`absolute -left-[30px] top-6 w-5 h-5 rounded-full ring-4 ring-paper ${sel === d ? "bg-flame" : "bg-slate-300"}`} />
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-widest text-flame">{d.kind}</span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${d.status === "sample" ? "bg-slate-100 text-slate-500" : "bg-green-50 text-leaf"}`}>{d.status === "sample" ? "Sample layout" : "Upcoming"}</span>
                    </div>
                    <div className="mt-1 font-bold text-ink text-lg">{d.title}</div>
                    <div className="text-sm text-slate-500">{d.date}</div>
                    <p className="text-sm text-slate-600 mt-2">{d.desc}</p>
                    <div className="mt-3 flex gap-3 text-sm font-bold">
                      <span className="text-royal">👁 View</span>
                      <span className="text-slate-400">⬇ Download PDF</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="sticky top-24 rounded-[28px] bg-ink p-3 overflow-hidden">
              <SunArc className="absolute -top-6 right-0 w-80 opacity-10" />
              <div className="relative flex items-center justify-between px-4 py-3 text-white">
                <div>
                  <Eyebrow color="#ffc069">Document viewer</Eyebrow>
                  <div className="font-bold mt-1">{sel.title}</div>
                </div>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-white/10">−</button>
                  <button className="w-9 h-9 rounded-full bg-white/10">+</button>
                  <button disabled className="px-4 h-9 rounded-full bg-saffron/40 text-white text-sm font-bold">⬇ PDF</button>
                </div>
              </div>
              <div className="relative bg-white rounded-[24px] aspect-[4/5] p-8 md:p-10">
                <div className="flex items-center justify-between border-b-2 border-orange-100 pb-4">
                  <div>
                    <div className="font-display font-extrabold text-royal text-xl">Empirical Shiksha Abhiyan Samiti</div>
                    <div className="text-sm text-slate-500">Khandwa, Madhya Pradesh · {fy}</div>
                  </div>
                  <div className="text-xs font-bold text-flame uppercase">{sel.kind}</div>
                </div>
                <div className="mt-6 space-y-3">
                  {[90, 70, 85, 60, 75, 50, 80, 65].map((w, i) => <div key={i} className="h-3 rounded-full bg-slate-100" style={{ width: w + "%" }} />)}
                </div>
                <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center">
                  <div className="text-4xl">📄</div>
                  <div className="mt-2 font-bold text-ink">No document published yet</div>
                  <p className="text-sm text-slate-500 mt-1">This is a layout preview. The official document will be shown here once the organisation publishes it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
