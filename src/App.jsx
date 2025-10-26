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

const App = () => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const speakersRef = useRef(null);
  const venueRef = useRef(null);
  const bookletRef = useRef(null);

  const location = useLocation();

  // map section ids to refs
  const sectionRefs = {
    "#home": homeRef,
    "#about": aboutRef,
    "#speakers": speakersRef,
    "#venue": venueRef,
    "#booklet": bookletRef,
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800 text-white">
      <Navbar onScrollTo={handleScrollTo} />
      <section ref={homeRef} id="home">
        <Home />
      </section>
      <section ref={aboutRef} id="about">
        <About />
      </section>
      <section ref={speakersRef} id="speakers">
        <Speakers />
      </section>
      <section>
        <CompanyBanner title={"RECONSA 2026 PARTNERS"} />
      </section>
      <section ref={venueRef} id="venue">
        <Venues />
      </section>
      <section>
        <CompanyBanner title={"RECONSA 2026 COLLABORATORS"} />
      </section>
      <section ref={bookletRef} id="booklet">
        <Booklet />
      </section>
      <Footer />
    </div>
  );
};

export default App;
