import type { ReactNode } from "react";
import { BarChart3, BookOpen, Briefcase, Check, GraduationCap, Mountain, Monitor, Settings, Target, Trophy, Users } from "lucide-react";
import type { Page } from "../../shared";
import { Flag, Img, Words, vars } from "./bits";
import { SHOW_UNCONFIRMED, type FounderData, type IconName } from "./story";

const ICON: Record<IconName, typeof Settings> = { Settings, Target, BookOpen, Users, GraduationCap, Trophy, Briefcase, Mountain, Monitor, BarChart3 };
const I = ({ n, size = 22 }: { n: IconName; size?: number }) => { const C = ICON[n]; return <C size={size} strokeWidth={1.9} aria-hidden />; };
const SKILL_COLORS = ["#E0352B", "#2B7AD8", "#1CA7A0", "#7B4FD6", "#E8791A", "#2E9D4F"];
const ok = (d: { confirm?: boolean }) => !d.confirm || SHOW_UNCONFIRMED;
const d = (s: string, k?: string) => <path d={s} pathLength={1} className="draw" key={k ?? s} />;

const Building = () => (
  <svg className="fd-decor" viewBox="0 0 320 200" fill="none" aria-hidden>
    {d("M30 170H300")}{d("M60 170V70L190 40V170")}{d("M190 40L270 62V170")}{d("M60 70L190 40L270 62")}
    {d("M80 90H120M80 110H120M80 130H120M140 80H175M140 100H175M140 120H175M205 80H255M205 100H255M205 120H255")}
    {d("M20 170V150M20 130A14 18 0 1 1 20 150")}{d("M300 170V140M300 118A16 20 0 1 1 300 140")}
    <text x="88" y="64" className="fd-bld-txt">Empirical</text>
  </svg>
);

export default function Founder({ f, go, h, children }: { f: FounderData; go: (p: Page) => void; h: string; children?: ReactNode }) {
  return (
    <section data-scene={f.id} data-tone="paper" className={`scene pin fd-scene fd-${f.side}`} style={vars({ "--h": h })} aria-label={`${f.name} — ${f.role}`}>
      <div className="stage fd">
        <p className="fd-stick"><span>{f.tag}</span></p>
        <figure className="fd-portrait" data-slide={f.side}>
          <span className="fd-halo" aria-hidden />
          <Img src={f.img} alt={f.alt} />
          <div className="fd-name"><div><b className="display">{f.name}</b><span>{f.role}</span><i /></div></div>
        </figure>

        <div className="fd-main">
          <div className="fd-head">
            <div className="fd-headtxt">
              <h2 className="fd-h display" data-words><Words text={f.head[0]} /> <span className="hl"><Words text={f.head[1]} /></span></h2>
              <p className="fd-intro" data-k>{f.intro}</p>
            </div>
            <div className="fd-side">
              {f.decor === "books" ? (
                <div className="fd-decor fd-books" aria-hidden>{f.books?.map((b) => <span className="book hand" key={b}>{b}</span>)}</div>
              ) : <Building />}
              {f.note && <p className="fd-note" data-k><span>{f.note}</span></p>}
            </div>
          </div>

          <div className="fd-stats">
            {f.stats.filter(ok).map((s) => (
              <div className={`fd-stat t-${s.tone}`} data-k key={s.label}>
                <I n={s.icon} size={30} />
                <div><b className="display">{s.big}{s.confirm && <Flag />}</b><span>{s.label}</span></div>
              </div>
            ))}
            {f.cta && <a className="fd-cta" href="#/contact" onClick={(e) => { e.preventDefault(); go(f.cta!.page); }}><Users size={18} aria-hidden />{f.cta.label}</a>}
          </div>

          <div className="fd-panels">
            {f.panels.map((p) => (
              <div className={`fd-panel mk-${p.mark ?? "blue"}`} data-k key={p.title}>
                <h3 className="display"><I n={p.icon} />{p.title}</h3>
                {p.sub && <p>{p.sub}</p>}
                <ul className={p.two ? "two" : ""}>{p.items.map((it, n) => {
                  const [name, yrs] = it.split(" – ");
                  return yrs
                    ? <li className="fd-item fd-skill" key={it}><i style={{ background: SKILL_COLORS[n % SKILL_COLORS.length] }} aria-hidden>{name.replace("Autodesk ", "").charAt(0)}</i><span>{name}</span><em>{yrs}</em></li>
                    : <li className="fd-item" key={it}><Check size={15} strokeWidth={3} aria-hidden />{it}</li>;
                })}</ul>
              </div>
            ))}
            <div className="fd-cards">
              {f.cards.filter(ok).map((c) => (
                <div className={`fd-card t-${c.tone}`} data-k key={c.title}>
                  <h3 className="display"><I n={c.icon} />{c.title}{c.confirm && <Flag />}</h3>
                  {c.sub && <p>{c.sub}</p>}
                  {c.chips && <div className="chips">{c.chips.map((x) => <span key={x}>{x}</span>)}</div>}
                  {c.items && <ul>{c.items.map((it) => <li className="fd-item" key={it}><Check size={14} strokeWidth={3} aria-hidden />{it}</li>)}</ul>}
                </div>
              ))}
            </div>
          </div>

          {f.bottom && (
            <div className="fd-bottom" data-k>
              <div className="fd-phil"><span className="hand">{f.bottom.tag}</span><p>“{f.bottom.quote}”</p></div>
              <div className="fd-pills">{f.bottom.chips.map((c) => <span key={c.label}><I n={c.icon} size={20} />{c.label}</span>)}</div>
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
