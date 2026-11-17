import { useRef, useState, type MouseEvent } from "react";
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
  const link = (page: Page) => (e: MouseEvent) => { e.preventDefault(); go(page); };

  return (
    <div ref={root} className="film notranslate" translate="no" data-no-motion>
      {/* ───── 01 · THE QUESTION ───── */}
      <section data-scene="open" data-tone="night" className="scene pin-all" style={vars({ "--h": "300vh", "--hm": "210svh" })} aria-label="अध्याय 1: सवाल">
        <div className="stage s-open">
          <div className="bg" data-k="bg"><Img src={IMG.open} eager /></div>
          <div className="shade dark" data-k="dark" />
          <div className="shade warm" data-k="warm" />
          <div className="grain" aria-hidden />
          <div className="open-copy">
            <h1 className="q display"><Words text="क्या हम कोई ऐसा समाज बना सकते हैं जो निजी स्वार्थ से ऊपर हो?" /></h1>
            <p className="a display"><Words text="हमने इसका जवाब सिर्फ़ सोचा नहीं… इसे जीना शुरू किया।" /></p>
          </div>
          <div className="cue" aria-hidden><span />स्क्रॉल करें</div>
        </div>
      </section>

      {/* ───── 02 · THE PEOPLE BEHIND THE IDEA ───── */}
      <section data-scene="people" data-tone="paper" className="scene pin" style={vars({ "--h": "330vh" })} aria-label="अध्याय 2: इस विचार के पीछे के लोग">
        <div className="stage s-people">
          <div className="pe-halo" aria-hidden />
          <span className="pe-ghost pe-ghost-r" aria-hidden>राहुल</span>
          <span className="pe-ghost pe-ghost-j" aria-hidden>जयराम</span>
          <h2 className="pe-q display"><Words text="एक इंसान अपने ज्ञान और स्किल्स को सिर्फ़ अपने करियर तक सीमित क्यों रखे?" /></h2>
          <figure className="pe-fig pe-r" data-slide="l"><Img src={IMG.rahul} alt="राहुल गीते, संस्थापक" />
            <figcaption className="pe-cap pe-cap-r"><div><b className="display">राहुल गीते</b><span>संस्थापक</span><i /></div></figcaption></figure>
          <figure className="pe-fig pe-j" data-slide="r"><Img src={IMG.jayram} alt="जयराम मालाकार, संस्थापक एवं संस्थान प्रमुख" />
            <figcaption className="pe-cap pe-cap-j"><div><b className="display">जयराम मालाकार</b><span>संस्थापक एवं संस्थान प्रमुख</span><i /></div></figcaption></figure>
          <p className="pe-tag display"><Words text="दो अलग रास्ते। एक साझा सवाल।" /></p>
        </div>
      </section>

      {/* ───── 03 · RAHUL GEETE (photo left) ───── */}
      <Founder f={RAHUL_F} go={go} h="700vh">
        <div className="ph-reveal">
          <Img className="ph ph-a" src={IMG.classroom} />
          <Img className="ph ph-b" src={IMG.community} />
          <div className="ph-shade" aria-hidden />
          <div className="ph-copy">
            <p className="ph-l1 display"><Words text="एक तरफ़ इंजीनियरिंग की गहरी समझ, तकनीकी विषयों का ज्ञान और पढ़ाने का अनुभव। दूसरी तरफ़ खंडवा के वे विद्यार्थी, जिन्हें सही मार्गदर्शन और शिक्षा सहयोग की ज़रूरत थी।" /></p>
            <p className="ph-l2 display"><Words text="ज्ञान सिर्फ़ करियर बनाने का ज़रिया नहीं। सही जगह इस्तेमाल हो, तो किसी और की ज़िंदगी में भी बदलाव ला सकता है।" /></p>
          </div>
        </div>
      </Founder>

      {/* ───── 04 · JAYRAM MALAKAR (photo right) ───── */}
      <Founder f={JAYRAM_F} go={go} h="620vh">
        <div className="j-strip-wrap">
          <p className="j-line display"><Words text="योजना से ज़मीन तक।" /></p>
          <div className="j-strip">
            <figure><Img src={IMG.buildPlant} /></figure>
            <figure><Img src={IMG.buildTarp} /></figure>
            <figure><Img src={IMG.buildRun} /></figure>
          </div>
        </div>
      </Founder>

      {/* ───── 05 · WHY SOCIAL SERVICE? ───── */}
      <section data-scene="turn" data-tone="night" className="scene pin-all" style={vars({ "--h": "380vh", "--hm": "250svh" })} aria-label="अध्याय 5: बड़ा सवाल">
        <div className="stage s-turn">
          <div className="t-photos" aria-hidden>
            <div className="t-photo t-p0"><Img src={IMG.turnC} /></div>
            <div className="t-photo t-p1"><Img src={IMG.turnA} /></div>
            <div className="t-photo t-p2"><Img src={IMG.turnB} /></div>
            <div className="t-photo t-p3"><Img src={IMG.turnC} /></div>
          </div>
          <div className="t-copy">
            <h2 className="t-q display"><Words text="जब किसी इंसान के पास इतना ज्ञान, कौशल और अनुभव हो, तो वह अपना समय समाज सेवा में क्यों लगाता है?" /></h2>
            <p className="t-a display"><Words text="शायद इसलिए कि असली सफलता सिर्फ़ इस बात में नहीं कि हमने अपने लिए क्या बनाया। बल्कि इसमें भी है कि हम अपने आस-पास के लोगों के लिए क्या बदल पाए।" /></p>
          </div>
        </div>
      </section>

      {/* ───── 06 · THE BEGINNING: 2021 ───── */}
      <section data-scene="begin" data-tone="paper" className="scene flow s-begin" aria-label="अध्याय 6: शुरुआत">
        <div className="begin-grid">
          <div className="year-col"><span className="year display" data-k>2021</span><p className="chap">अध्याय 6 / 8</p></div>
          <div className="begin-body">
            <span className="tline" data-line aria-hidden />
            <p className="big display" data-words><Words text="हर बड़े बदलाव की शुरुआत छोटी होती है।" /></p>
            <div className="begin-photos">
              <figure className="bp bp-a"><Img src={IMG.begin} data-speed="6" /></figure>
              <figure className="bp bp-b"><Img src={IMG.beginGroup} data-speed="10" /></figure>
            </div>
            <div className="tl-item" data-k><i /><b className="display">2021</b><span>लॉकडाउन के बाद</span></div>
            <p className="mid display" data-words><Words text="2021 के लॉकडाउन के बाद, खंडवा में कुछ विद्यार्थियों के साथ एक छोटी-सी शैक्षणिक पहल शुरू हुई। इसी से एकलव्य बैच की नींव पड़ी।" /></p>
            <div className="tl-item" data-k><i /><b className="display">एकलव्य बैच</b><span>निःशुल्क, नियमित शैक्षणिक सहयोग</span></div>
          </div>
        </div>
      </section>

      {/* ───── 07 · FROM EDUCATION TO A MOVEMENT ───── */}
      <section data-scene="move" data-tone="night" className="scene flow s-move" aria-label="अध्याय 7: शिक्षा से एक आंदोलन तक">
        <div className="move-grid">
          <div className="move-copy">
            <p className="chap">अध्याय 7 / 8</p>
            <p className="date display" data-k>2 अक्टूबर 2024</p>
            <p className="date-sub" data-k>गांधी जयंती</p>
            <p className="mid display" data-words><Words text="काम कक्षा से बाहर निकला। विद्यार्थी और स्वयंसेवक रामेश्वर कुंड की सफ़ाई के लिए जुटे — और बार-बार लौटते रहे।" /></p>
          </div>
          <div className="move-photos">
            <figure className="mp mp-a"><Img src={IMG.kund} data-speed="7" /></figure>
            <figure className="mp mp-b"><Img src={IMG.kund2} data-speed="14" /></figure>
          </div>
        </div>
      </section>

      <section data-scene="pillars" data-tone="night" className="scene pin" style={vars({ "--h": "520vh" })} aria-label="चार स्तंभ">
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

      <section data-scene="reg" data-tone="night" className="scene flow s-reg" aria-label="पंजीकरण">
        <p className="reg-label" data-k>औपचारिक पंजीकरण</p>
        <p className="date display" data-k>13 जुलाई 2026</p>
        <p className="date-sub" data-k>एम्पिरिकल शिक्षा अभियान समिति · खंडवा, मध्य प्रदेश</p>
        <p className="mid display" data-words><Words text="एक छोटी-सी सोच धीरे-धीरे एक संगठित प्रयास में बदलने लगी।" /></p>
      </section>

      {/* ───── 08 · WHERE WE STAND TODAY ───── */}
      <section data-scene="today" data-tone="paper" className="scene flow s-today" aria-label="अध्याय 8: आज हम कहाँ हैं">
        <div className="today-col today-l" aria-hidden><figure><Img src={IMG.todayB} data-speed="10" /></figure><figure><Img src={IMG.todayC} data-speed="16" /></figure></div>
        <div className="today-copy">
          <p className="chap">अध्याय 8 / 8</p>
          <h2 className="display today-h" data-words><Words text="आज, यह सफ़र यहाँ तक पहुँचा है।" /></h2>
          <p className="today-s" data-k><b className="display"><CountUp value={TODAY.students} /></b> विद्यार्थियों से हमने बात की — शिक्षा ही हमारी शुरुआत थी।</p>
          <p className="today-s" data-k><b className="display"><CountUp value={TODAY.volunteers} /></b> स्वयंसेवक आज इस काम को साथ मिलकर आगे बढ़ा रहे हैं।</p>
          <p className="today-s" data-k><b className="display"><CountUp value={TODAY.trees} /></b> पौधे लगे, और <b className="display"><CountUp value={TODAY.waste} /> किलो</b> कचरा कुंडों और सड़कों से हटाया गया।</p>
          <p className="today-s" data-k><b className="display"><CountUp value={TODAY.events} /></b> अभियान और कार्यक्रम — सफ़ाई से लेकर मानसिक स्वास्थ्य जागरूकता तक।</p>
        </div>
        <div className="today-col today-r" aria-hidden><figure><Img src={IMG.todayD} data-speed="14" /></figure><figure><Img src={IMG.todayA} data-speed="8" /></figure></div>
      </section>

      {/* ───── FINAL · THE STORY IS STILL BEING WRITTEN ───── */}
      <section data-scene="final" data-tone="night" className="scene pin-all" style={vars({ "--h": "400vh", "--hm": "270svh" })} aria-label="कहानी अभी लिखी जा रही है">
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
            <h2 className="f1 display"><Words text="यह कहानी अभी ख़त्म नहीं हुई।" /></h2>
            <p className="f2 display"><Words text="हम एक ऐसा समाज बनाने की कोशिश कर रहे हैं जहाँ शिक्षा, ज़िम्मेदारी और सामूहिक प्रयास किसी एक व्यक्ति तक सीमित न रहें।" /></p>
            <div className="f3-wrap">
              <h2 className="f3 display"><Words text="इस कहानी का अगला हिस्सा… क्या आप लिखेंगे?" /></h2>
              <div className="f-ctas">
                <a className="cta cta-main f-cta" href="#/contact" onClick={link("contact")}>स्वयंसेवक बनें</a>
                <a className="cta cta-ghost f-cta" href="#/initiatives" onClick={link("initiatives")}>हमारा काम देखें</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Questions (kept from the previous About page) ───── */}
      <section data-scene="faq" data-tone="paper" className="scene flow s-faq" aria-label="लोग हमसे क्या पूछते हैं">
        <h2 className="display faq-h">लोग हमसे क्या पूछते हैं</h2>
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
