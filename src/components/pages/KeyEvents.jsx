import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data_source from "../json/events.json";
import ShinyText from "../ShinyText";

gsap.registerPlugin(ScrollTrigger);

const KeyEvents = () => {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const textContainerRef = useRef(null);

  const [activeSection, setActiveSection] = useState(0);
  const activeRef = useRef(0);

  const sections = data_source.map((event) => ({
    id: event.id,
    title: event.name,
    description: event.description,
    image: event.image,
  }));

  useEffect(() => {
    activeRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const progressBar = progressBarRef.current;
      const textContainer = textContainerRef.current;
      if (!container || !progressBar || !textContainer) return;

      gsap.set(textContainer, { y: 0 });
      const total = sections.length;

      ScrollTrigger.getById("org-main")?.kill();
      ScrollTrigger.create({
        id: "org-main",
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const p = self.progress;
          const panels = p * (total - 1);

          // Dynamically read the height to ensure perfect scrolling math across all screen sizes
          const panelHeight =
            textContainer.children[0]?.offsetHeight || window.innerHeight;
          const y = -panels * panelHeight;

          gsap.set(textContainer, { y });

          if (window.innerWidth >= 768) {
            gsap.set(progressBar, { height: `${p * 100}%` });
          }
        },
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("load", onResize);
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("load", onResize);
        window.removeEventListener("resize", onResize);
        ScrollTrigger.getById("org-main")?.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [sections.length]);

  return (
    <section>
      <div
        ref={containerRef}
        className="relative text-white"
        // Determines the scroll speed/duration
        style={{ minHeight: `${sections.length * 80}vh` }}
      >
        {/* Title Row */}
        <div className="w-full flex justify-center pt-10 md:pt-20 pb-10 md:pb-0">
          <ShinyText
            text="KEY EVENTS"
            disabled={false}
            speed={2.5}
            className="font-Poppins font-extrabold tracking-tight text-4xl sm:text-5xl md:text-7xl leading-tight text-center"
          />
        </div>

        {/* Main Content Row */}
        {/* UPDATED: Centers items vertically on mobile, but keeps the top padding layout for desktop */}
        <div className="sticky top-0 h-[100dvh] overflow-hidden flex flex-col md:flex-row items-center md:items-start md:pt-[12vh]">
          {/* Progress Bar: Desktop Only */}
          <div className="hidden md:flex md:w-16 md:items-center md:justify-center px-6 md:px-0 mb-4 md:mb-0 h-[75vh]">
            <div className="relative mx-auto md:mx-0 w-1 h-3/5 bg-white/15 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="w-full bg-gradient-to-t from-[#787CFE] via-[#4854CE] to-[#172D9D] rounded-full origin-bottom"
                style={{ height: "0%" }}
              />
            </div>
          </div>

          {/* Sliding Text + Image Panels */}
          <div
            ref={textContainerRef}
            className="relative will-change-transform flex-1 w-full"
          >
            {sections.map((section) => (
              <div
                key={section.id}
                // UPDATED: Reduced mobile height to h-[60vh] to shrink the gap drastically.
                className="h-[60vh] md:h-[75vh] w-full flex flex-col md:flex-row items-center justify-center px-6 md:px-24 gap-4 md:gap-16"
              >
                {/* Image */}
                {/* UPDATED: Scaled the image down slightly on mobile so it fits the tighter 60vh layout nicely */}
                <div className="w-full md:w-[40vw] flex items-center justify-center mb-4 md:mb-0 md:order-2">
                  <div className="w-[65vw] max-w-[280px] h-auto md:w-[32vw] md:h-[48vh] md:max-w-[500px] md:max-h-[400px] flex items-center justify-center">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                </div>

                {/* Text */}
                {/* UPDATED: Reduced space-y on mobile so the text is more compact */}
                <div className="max-w-xl space-y-2 md:space-y-4 flex-1 text-center md:text-left flex flex-col justify-center items-center md:items-start">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-1 md:mb-4">
                    {section.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-white/80 md:max-w-md">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyEvents;
