import { useRef, useEffect } from "react";
import { useLocation } from "react-router";
import Navbar from "./components/blocks/header";
import Venues from "./components/pages/venues";
import Speakers from "./components/pages/Speakers";
import Booklet from "./components/pages/Booklet";
import Footer from "./components/blocks/footer";
import Home from "./components/pages/Home";
import About from "./components/pages/Abouts";
import CompanyBanner from "./components/pages/CompanyBanner";
import "./index.css";
import SubThemes from "./components/pages/SubTheme";

const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const speakersRef = useRef(null);
  const venueRef = useRef(null);
  const bookletRef = useRef(null);
  const subThemesRef = useRef(null);

  const location = useLocation();

  // map section ids to refs
  const sectionRefs = {
    "#home": homeRef,
    "#about": aboutRef,
    "#speakers": speakersRef,
    "#venue": venueRef,
    "#booklet": bookletRef,
    "#subthemes": subThemesRef,
  };

  // autoscroll handler
  const handleScrollTo = (id) => {
    const ref = sectionRefs[id];
    if (ref && ref.current) {
      const yOffset = -80;
      const y =
        ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      const target = location.hash || location.state?.scrollTo;
      if (target) {
        handleScrollTo(target);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#461B61] text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9f44db] rounded-full filter blur-[150px] opacity-40 pointer-events-none" />
      <Navbar onScrollTo={handleScrollTo} />
      <section ref={homeRef} id="home">
        <Home />
      </section>
      <section ref={aboutRef} id="about">
        <About />
      </section>
      <section ref={subThemesRef} id="subthemes">
        <SubThemes />
      </section>
      <section ref={speakersRef} id="speakers">
        <Speakers />
      </section>
      <section>
        <CompanyBanner title={"RECONSA 2026 COLLABORATORS"} />
      </section>
      <section ref={venueRef} id="venue">
        <Venues />
      </section>
      <section ref={bookletRef} id="booklet">
        <Booklet />
      </section>
      <Footer />
    </div>
  );
};

export default App;
