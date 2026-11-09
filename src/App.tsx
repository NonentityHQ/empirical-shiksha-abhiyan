import { useCallback, useEffect, useRef, useState } from "react";
import { Footer, Navbar, NAV, type Page } from "./shared";
import Home from "./pages/Home";
import About from "./pages/About";
import Initiatives from "./pages/Initiatives";
import Impact from "./pages/Impact";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import { DecorDefs } from "./decor";
import SuccessStories from "./pages/SuccessStories";
import SubNav from "./subnav";
import InitiativeDetail from "./pages/InitiativeDetail";
import MotionEnhancer from "./MotionEnhancer";

type RouteState = { page: Page; initiativeId: string };

const readRoute = (): RouteState => {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (h === "gallery" || h.startsWith("gallery/")) return { page: "gallery", initiativeId: "" };
  if (h === "initiatives") return { page: "initiatives", initiativeId: "" };
  if (h.startsWith("initiatives/")) {
    return { page: "initiative-detail", initiativeId: h.split("/")[1] || "" };
  }
  if (h === "reports") return { page: "home", initiativeId: "" };
  return { page: NAV.some((n) => n.id === h) ? (h as Page) : "home", initiativeId: "" };
};

export default function App() {
  const [route, setRoute] = useState<RouteState>(readRoute);
  const { page, initiativeId } = route;
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "exit" | "enter">("idle");
  const transitionLock = useRef(false);

  const transitionTo = useCallback((nextRoute: RouteState, nextHash?: string, pushHistory = true) => {
    if (transitionLock.current) return;
    if (route.page === nextRoute.page && route.initiativeId === nextRoute.initiativeId) return;

    const commit = () => {
      if (pushHistory && nextHash && window.location.hash !== nextHash) {
        window.history.pushState({}, "", nextHash);
      }
      setRoute(nextRoute);
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      commit();
      return;
    }

    transitionLock.current = true;
    setTransitionPhase("exit");

    // Cross-dissolve the outgoing page first, then bring the next page into focus.
    window.setTimeout(() => {
      commit();
      setTransitionPhase("enter");
      window.setTimeout(() => {
        setTransitionPhase("idle");
        transitionLock.current = false;
      }, 680);
    }, 230);
  }, [route]);

  useEffect(() => {
    const syncRoute = () => transitionTo(readRoute(), undefined, false);
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, [transitionTo]);

  const navigate = useCallback((path: string, nextPage: Page, nextInitiativeId = "") => {
    const nextHash = `#${path.startsWith("/") ? path : `/${path}`}`;
    transitionTo({ page: nextPage, initiativeId: nextInitiativeId }, nextHash, true);
  }, [transitionTo]);

  const goSection = useCallback((key: string) => {
    navigate(`/initiatives/${key}`, "initiative-detail", key);
  }, [navigate]);

  const go = useCallback((nextPage: Page) => {
    navigate(`/${nextPage}`, nextPage, "");
  }, [navigate]);

  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  useEffect(() => {
    let revealTimer: number | undefined;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
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
  }, []);

  return (
    <div className="relative isolate min-h-screen flex flex-col">
      {page === "contact" && <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[300px] overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 45%, transparent)", maskImage: "linear-gradient(to bottom, #000 45%, transparent)" }} aria-hidden>
        <img src="images/clean-group-1.png" alt="" className="w-full h-full object-cover object-[22%_top] sm:object-top opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/60" />
      </div>}
      <DecorDefs />
      {/* Reserve the fixed navbar's space so page content never starts underneath it. */}
      <div className="h-[76px] shrink-0" aria-hidden="true" />
      <Navbar page={page} go={go} scrolled={scrolled} visible={navVisible} />
      <SubNav page={page} onPick={goSection} activeKey={initiativeId} navVisible={navVisible} />
      <main id="site-main" className={`flex-1 route-transition phase-${transitionPhase} ${page === "contact" ? "" : "hero-under"}`} key={page === "gallery" || page === "initiative-detail" ? `${page}:${initiativeId}` : page}>
        {page === "home" && <Home go={go} onPick={goSection} />}
        {page === "about" && <About go={go} />}
        {page === "initiatives" && <Initiatives onPick={goSection} />}
        {page === "initiative-detail" && <InitiativeDetail id={initiativeId} goBack={() => go("initiatives")} />}
        {page === "impact" && <Impact />}
        {page === "gallery" && <Gallery />}
        {page === "success" && <SuccessStories go={go} />}
        {page === "contact" && <Contact />}
        <MotionEnhancer routeKey={`${page}:${initiativeId}`} />
      </main>
      <Footer go={go} />
    </div>
  );
}
