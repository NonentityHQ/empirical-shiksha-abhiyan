import { useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { type Page } from "../shared";
import { CountUp } from "../ui";
import { useCinema } from "./about/useCinema";
import Founder from "./about/Founder";
import { Img, Words, vars } from "./about/bits";
import { FAQ, FINAL_WALL, IMG, JAYRAM_F, PILLARS, RAHUL_F, TODAY } from "./about/story";
import "./about/film.css";

/* ---------- the page ---------- */
export default function About({ go }: { go: (p: Page) => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(0);
  useCinema(root);

  /* 2021 timeline: stop the orange line exactly at the centre of the last point (works on every screen width / language). */
  useLayoutEffect(() => {
    const body = root.current?.querySelector<HTMLElement>(".begin-body");
    if (!body) return;
    const fit = () => {
      const items = body.querySelectorAll<HTMLElement>(".tl-item");
      const item = items[items.length - 1];
      const dot = item?.querySelector<HTMLElement>("i");
      if (!item || !dot) return;
      const centre = item.offsetTop + dot.offsetTop + dot.offsetHeight / 2; // offset* ignores GSAP transforms
      body.style.setProperty("--tl-end", `${Math.max(0, body.offsetHeight - centre)}px`);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(body);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);
  const link = (page: Page) => (e: MouseEvent) => { e.preventDefault(); go(page); };

  return (
    <div ref={root} className="film" data-no-motion>
      {/* ───── 01 · THE QUESTION ───── */}
      <section data-scene="open" data-tone="night" className="scene pin-all" style={vars({ "--h": "300vh", "--hm": "210svh" })} aria-label="Chapter 1: The Question">
        <div className="stage s-open">
          <div className="bg" data-k="bg"><Img src={IMG.open} eager /></div>
          <div className="shade dark" data-k="dark" />
          <div className="shade warm" data-k="warm" />
          <div className="grain" aria-hidden />
          <div className="open-copy">
            <h1 className="q display"><Words text="Can we build a society that puts collective good above personal interest?" /></h1>
            <p className="a display"><Words text="We did not just think about the answer… we began living it." /></p>
          </div>
          <div className="cue" aria-hidden><span />Scroll</div>
        </div>
      </section>

      {/* ───── 02 · THE PEOPLE BEHIND THE IDEA ───── */}
      <section data-scene="people" data-tone="paper" className="scene pin" style={vars({ "--h": "330vh" })} aria-label="Chapter 2: The People Behind the Idea">
        <div className="stage s-people">
          <div className="pe-halo" aria-hidden />
          <span className="pe-ghost pe-ghost-r" aria-hidden>Rahul</span>
          <span className="pe-ghost pe-ghost-j" aria-hidden>Jayram</span>
          <h2 className="pe-q display"><Words text="Why should someone limit their knowledge and skills to their own career?" /></h2>
          <figure className="pe-fig pe-r" data-slide="l"><Img src={IMG.rahul} alt="Rahul Geete, Founder" />
            <figcaption className="pe-cap pe-cap-r"><div><b className="display" >Rahul Geete</b><span>Founder</span><i /></div></figcaption></figure>
          <figure className="pe-fig pe-j" data-slide="r"><Img src={IMG.jayram} alt="Jayram Malakar, Founder and Institute Director" />
            <figcaption className="pe-cap pe-cap-j"><div><b className="display">Jayram Malakar</b><span>Founder &amp; Institute Director</span><i /></div></figcaption></figure>
          <p className="pe-tag display"><Words text="Two different paths. One shared question." /></p>
        </div>
      </section>

      {/* ───── 03 · RAHUL GEETE (photo left) ───── */}
      <Founder f={RAHUL_F} go={go} h="700vh">
        <div className="ph-reveal">
          <Img className="ph ph-a" src={IMG.classroom} />
          <Img className="ph ph-b" src={IMG.community} />
          <div className="ph-shade" aria-hidden />
          <div className="ph-copy">
            <p className="ph-l1 display"><Words text="On one side was deep engineering knowledge, technical expertise and teaching experience. On the other were students in Khandwa who needed guidance and academic support." /></p>
            <p className="ph-l2 display"><Words text="Knowledge is more than a way to build a career. Used well, it can also make a meaningful difference in someone else’s life." /></p>
          </div>
        </div>
      </Founder>

      {/* ───── 04 · JAYRAM MALAKAR (photo right) ───── */}
      <Founder f={JAYRAM_F} go={go} h="620vh">
        <div className="j-strip-wrap">
          <p className="j-line display"><Words text="From planning to action." /></p>
          <div className="j-strip">
            <figure><Img src={IMG.buildPlant} /></figure>
            <figure><Img src={IMG.buildTarp} /></figure>
            <figure><Img src={IMG.buildRun} /></figure>
          </div>
        </div>
      </Founder>

      {/* ───── 05 · WHY SOCIAL SERVICE? ───── */}
      <section data-scene="turn" data-tone="night" className="scene pin-all" style={vars({ "--h": "380vh", "--hm": "250svh" })} aria-label="Chapter 5: A Bigger Question">
        <div className="stage s-turn">
          <div className="t-photos" aria-hidden>
            <div className="t-photo t-p0"><Img src={IMG.turnC} /></div>
            <div className="t-photo t-p1"><Img src={IMG.turnA} /></div>
            <div className="t-photo t-p2"><Img src={IMG.turnB} /></div>
            <div className="t-photo t-p3"><Img src={IMG.turnC} /></div>
          </div>
          <div className="t-copy">
            <h2 className="t-q display"><Words text="When someone has so much knowledge, skill and experience, why devote time to community service?" /></h2>
            <p className="t-a display"><Words text="Perhaps because success is not only about what we build for ourselves. It is also about what we can change for the people around us." /></p>
          </div>
        </div>
      </section>

      {/* ───── 06 · THE BEGINNING: 2021 ───── */}
      <section data-scene="begin" data-tone="paper" className="scene flow s-begin" aria-label="Chapter 6: The Beginning">
        <div className="begin-grid">
          <div className="year-col"><span className="year display" data-k>2021</span><p className="chap">Chapter 6 / 8</p></div>
          <div className="begin-body">
            <span className="tline" data-line aria-hidden />
            <p className="big display" data-words><Words text="Every meaningful change begins with a small step." /></p>
            <div className="begin-photos">
              <figure className="bp bp-a"><Img src={IMG.begin} data-speed="6" /></figure>
              <figure className="bp bp-b"><Img src={IMG.beginGroup} data-speed="10" /></figure>
            </div>
            <div className="tl-item" data-k><i /><b className="display">2021</b><span>After the lockdown</span></div>
            <p className="mid display" data-words><Words text="After the 2021 lockdown, a small educational initiative began with a few students in Khandwa. This became the foundation of the Eklavya Batch." /></p>
            <div className="tl-item" data-k><i /><b className="display">Eklavya Batch</b><span>Free, regular academic support</span></div>
          </div>
        </div>
      </section>

      {/* ───── 07 · FROM EDUCATION TO A MOVEMENT ───── */}
      <section data-scene="move" data-tone="night" className="scene flow s-move" aria-label="Chapter 7: From Education to a Movement">
        <div className="move-grid">
          <div className="move-copy">
            <p className="chap">Chapter 7 / 8</p>
            <p className="date display" data-k>2 October 2024</p>
            <p className="date-sub" data-k>Gandhi Jayanti</p>
            <p className="mid display" data-words><Words text="The work moved beyond the classroom. Students and volunteers came together to clean Rameshwar Kund — and kept coming back." /></p>
          </div>
          <div className="move-photos">
            <figure className="mp mp-a"><Img src={IMG.kund} data-speed="7" /></figure>
            <figure className="mp mp-b"><Img src={IMG.kund2} data-speed="14" /></figure>
          </div>
        </div>
      </section>

      <section data-scene="pillars" data-tone="night" className="scene pin" style={vars({ "--h": "520vh" })} aria-label="The Four Pillars">
        <div className="stage s-pillars">
          {PILLARS.map((p) => (
            <div className="pillar" key={p.id}>
              <Img src={p.img} style={{ objectPosition: p.pos }} />
              <div className="p-shade" aria-hidden />
              <div className="p-txt"><span className="p-hi display">{p.hi}</span><b className="display">{p.title}</b><span>{p.line}</span></div>
            </div>
          ))}
          <div className="p-dots" aria-hidden>{PILLARS.map((p) => <i className="p-dot" key={p.id} />)}</div>
        </div>
      </section>

      <section data-scene="reg" data-tone="night" className="scene flow s-reg" aria-label="Registration">
        <p className="reg-label" data-k>Official registration</p>
        <p className="date display" data-k>13 July 2026</p>
        <p className="date-sub" data-k>Empirical Shiksha Abhiyan Samiti · Khandwa, Madhya Pradesh</p>
        <p className="mid display" data-words><Words text="A small idea gradually grew into an organised community effort." /></p>
      </section>

      {/* ───── 08 · WHERE WE STAND TODAY ───── */}
      <section data-scene="today" data-tone="paper" className="scene flow s-today" aria-label="Chapter 8: Where We Are Today">
        <div className="today-col today-l" aria-hidden><figure><Img src={IMG.todayB} data-speed="10" /></figure><figure><Img src={IMG.todayC} data-speed="16" /></figure></div>
        <div className="today-copy">
          <p className="chap">Chapter 8 / 8</p>
          <h2 className="display today-h" data-words><Words text="This is how far the journey has brought us today." /></h2>
          <p className="today-s" data-k><b className="display"><CountUp value={TODAY.students} /></b> students reached — education was where we began.</p>
          <p className="today-s" data-k><b className="display"><CountUp value={TODAY.volunteers} /></b> volunteers are carrying this work forward together.</p>
          <p className="today-s" data-k><b className="display"><CountUp value={TODAY.trees} /></b> trees planted, and <b className="display"><CountUp value={TODAY.waste} /> kg of </b> waste removed from ponds and streets.</p>
          <p className="today-s" data-k><b className="display"><CountUp value={TODAY.events} /></b> programmes and campaigns — from clean-up drives to mental health awareness.</p>
        </div>
        <div className="today-col today-r" aria-hidden><figure><Img src={IMG.todayD} data-speed="14" /></figure><figure><Img src={IMG.todayA} data-speed="8" /></figure></div>
      </section>

      {/* ───── FINAL · THE STORY IS STILL BEING WRITTEN ───── */}
      <section data-scene="final" data-tone="night" className="scene pin-all" style={vars({ "--h": "400vh", "--hm": "270svh" })} aria-label="The Story Is Still Being Written">
        <div className="stage s-final">
          <div className="f-photos" aria-hidden>
            <div className="f-drift">
              <div className="f-wall">{FINAL_WALL.map((src, i) => <figure className="f-tile" key={i}><Img src={src} /></figure>)}</div>
            </div>
            <figure className="f-cut f-4"><Img src={IMG.rahul} /></figure>
            <figure className="f-cut f-5"><Img src={IMG.jayram} /></figure>
          </div>
          <div className="f-shade" aria-hidden />
          <div className="f-copy">
            <h2 className="f1 display"><Words text="This story is far from over." /></h2>
            <p className="f2 display"><Words text="We are working towards a society where education, responsibility and collective action are not limited to one person." /></p>
            <div className="f3-wrap">
              <h2 className="f3 display"><Words text="The next chapter of this story… will you help write it?" /></h2>
              <div className="f-ctas">
                <a className="cta cta-main f-cta" href="#/contact" onClick={link("contact")}>Become a Volunteer</a>
                <a className="cta cta-ghost f-cta" href="#/initiatives" onClick={link("initiatives")}>Explore Our Work</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Questions (kept from the previous About page) ───── */}
      <section data-scene="faq" data-tone="paper" className="scene flow s-faq" aria-label="Frequently Asked Questions">
        <h2 className="display faq-h">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQ.map((item, i) => (
            <div className={`faq-item ${open === i ? "on" : ""}`} key={item.q}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span>{item.q}</span><i aria-hidden>{open === i ? "−" : "+"}</i></button>
              {open === i && <p>{item.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
