import { useCallback, useEffect, useState } from "react";
import { Footer, Navbar, NAV, type Page } from "./shared";
import Home from "./pages/Home";
import About from "./pages/About";
import Initiatives from "./pages/Initiatives";
import Impact from "./pages/Impact";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import { DecorDefs } from "./decor";
import InitFooter from "./pages/InitFooter";
import { useMotion } from "./motion";
import SubNav from "./subnav";
import Stars from "./pages/Stars";
import StarDetail from "./pages/StarDetail";
import SuccessStories from "./pages/SuccessStories";
import InitiativeDetail from "./pages/InitiativeDetail";

type RouteState = { page: Page; initiativeId: string };

const readRoute = (): RouteState => {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (h === "gallery" || h.startsWith("gallery/")) return { page: "gallery", initiativeId: "" };
  if (h === "initiatives") return { page: "initiatives", initiativeId: "" };
  if (h.startsWith("initiatives/")) {
    return { page: "initiative-detail", initiativeId: h.split("/")[1] || "" };
  }
  if (h.startsWith("stars/")) return { page: "star-detail", initiativeId: h.split("/")[1] || "" };
  if (h === "reports") return { page: "home", initiativeId: "" };
  return { page: NAV.some((n) => n.id === h) ? (h as Page) : "home", initiativeId: "" };
};

export default function App() {
  const [route, setRoute] = useState<RouteState>(readRoute);
  const { page, initiativeId } = route;

  useEffect(() => {
    const syncRoute = () => setRoute(readRoute());
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  const navigate = useCallback((path: string, nextPage: Page, nextInitiativeId = "") => {
    const nextHash = `#${path.startsWith("/") ? path : `/${path}`}`;
    if (window.location.hash !== nextHash) window.history.pushState({}, "", nextHash);
    setRoute({ page: nextPage, initiativeId: nextInitiativeId });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const goSection = useCallback((key: string) => {
    navigate(`/initiatives/${key}`, "initiative-detail", key);
  }, [navigate]);

  const openStar = useCallback((slug: string) => {
    navigate(`/stars/${slug}`, "star-detail", slug);
  }, [navigate]);

  const go = useCallback((nextPage: Page) => {
    navigate(`/${nextPage}`, nextPage, "");
  }, [navigate]);

  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  // About film: the floating bars show only at the very start and again once the film has finished.
  const [filmHidesBars, setFilmHidesBars] = useState(false);
  useEffect(() => {
    let revealTimer: number | undefined;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (page === "about") {
        const end = document.querySelector<HTMLElement>('[data-scene="faq"]');
        const endY = end ? end.getBoundingClientRect().top + y - window.innerHeight * 0.7 : Infinity;
        setFilmHidesBars(y > 8 && y < endY);
      } else setFilmHidesBars(false);
      if (y <= 8) {
        setNavVisible(true);
        if (revealTimer !== undefined) window.clearTimeout(revealTimer);
        return;
      }
      setNavVisible(false);
      if (revealTimer !== undefined) window.clearTimeout(revealTimer);
      revealTimer = window.setTimeout(() => setNavVisible(true), 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (revealTimer !== undefined) window.clearTimeout(revealTimer);
    };
  }, [page]);

  useMotion(page + ":" + initiativeId);
  return (
    <div className="relative isolate min-h-screen flex flex-col">
      {page === "contact" && <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[300px] overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 45%, transparent)", maskImage: "linear-gradient(to bottom, #000 45%, transparent)" }} aria-hidden>
        <img src="images/clean-group-1.webp" alt="" className="w-full h-full object-cover object-[22%_top] sm:object-top opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/60" />
      </div>}
      <DecorDefs />
      {/* Reserve the fixed navbar's space so page content never starts underneath it. */}
      <div className="shrink-0" style={{ height: page === "initiative-detail" ? 128 : page === "success" ? "calc(var(--stack-h, 150px) + 4px)" : 76 }} aria-hidden="true" />
      <Navbar page={page} go={go} onPickArea={goSection} flat={false} activeColor={page === "initiative-detail" && (initiativeId === "swachhata" || initiativeId === "paryavaran") ? "#1A7F78" : page === "initiative-detail" && initiativeId === "swasthya" ? "#2B459E" : "#2B459E"} scrolled={scrolled} visible={navVisible && !filmHidesBars} />
      <SubNav page={page} onPick={goSection} activeKey={initiativeId} navVisible={navVisible} hidden={filmHidesBars} />
      <main className={`flex-1 page-fade ${page === "contact" || page === "initiative-detail" || page === "success" || page === "about" ? "" : "hero-under"}`} key={page === "gallery" || page === "initiative-detail" || page === "star-detail" ? `${page}:${initiativeId}` : page}>
        {page === "home" && <Home go={go} />}
        {page === "about" && <About go={go} />}
        {page === "initiatives" && <Initiatives onPick={goSection} />}
        {page === "initiative-detail" && <InitiativeDetail id={initiativeId} goBack={() => go("initiatives")} />}
        {page === "impact" && <Impact />}
        {page === "gallery" && <Gallery />}
        {page === "success" && <SuccessStories go={go} />}
        {page === "stars" && <Stars go={go} openStar={openStar} />}
        {page === "star-detail" && <StarDetail id={initiativeId} go={go} openStar={openStar} />}
        {page === "contact" && <Contact />}
      </main>
      {page === "initiative-detail" && initiativeId !== "swasthya" ? <InitFooter go={go} variant={initiativeId} /> : <Footer go={go} variant={page === "initiative-detail" ? initiativeId : undefined} />}
    </div>
  );
}
