import { useEffect, useState } from "react";
import { Footer, Navbar, NAV, type Page } from "./shared";
import Home from "./pages/Home";
import About from "./pages/About";
import Initiatives from "./pages/Initiatives";
import Impact from "./pages/Impact";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import { DecorDefs } from "./decor";
import SubNav from "./subnav";

const fromHash = (): Page => {
  const h = window.location.hash.replace("#/", "");
  // Treat gallery sub-routes (e.g. gallery/shiksha) as gallery
  if (h === "gallery" || h.startsWith("gallery/")) return "gallery";
  if (h === "initiatives" || h.startsWith("initiatives/")) return "initiatives";
  if (h === "reports") return "home";
  return NAV.some((n) => n.id === h) ? (h as Page) : "home";
};

export default function App() {
  const [page, setPage] = useState<Page>(fromHash);
  useEffect(() => {
    const on = () => setPage(fromHash());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const [pending, setPending] = useState<string | null>(() => window.location.hash.match(/^#\/initiatives\/(\w+)/)?.[1] ?? null);
  useEffect(() => {
    if (!pending || page !== "initiatives") return;
    const t = setTimeout(() => { document.getElementById(pending)?.scrollIntoView({ behavior: "smooth", block: "start" }); setPending(null); }, 450);
    return () => clearTimeout(t);
  }, [pending, page]);
  const goSection = (k: string) => {
    window.location.hash = `/initiatives/${k}`;
    if (page === "initiatives") document.getElementById(k)?.scrollIntoView({ behavior: "smooth", block: "start" });
    else { setPage("initiatives"); setPending(k); window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); }
  };
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const go = (p: Page) => {
    window.location.hash = `/${p}`;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };
  return (
    <div className="relative isolate min-h-screen flex flex-col">
      {/* sky backdrop behind navbar + sub-navigation on every page */}
      {page === "contact" && <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[300px] overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 45%, transparent)", maskImage: "linear-gradient(to bottom, #000 45%, transparent)" }} aria-hidden>
        <img src="images/hero-bg.jpg" alt="" className="w-full h-full object-cover object-[22%_top] sm:object-top opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/60" />
      </div>}
      <DecorDefs />
      <Navbar page={page} go={go} scrolled={scrolled} />
      <SubNav page={page} onPick={goSection} scrolled={scrolled} />
      <main className={`flex-1 page-fade ${page === "contact" ? "" : "hero-under"}`} key={page === "gallery" ? window.location.hash : page}>
        {page === "home" && <Home go={go} />}
        {page === "about" && <About go={go} />}
        {page === "initiatives" && <Initiatives />}
        {page === "impact" && <Impact />}
        {page === "gallery" && <Gallery />}
        {page === "contact" && <Contact />}
      </main>
      <Footer go={go} />
    </div>
  );
}
