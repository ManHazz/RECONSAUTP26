import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import colour from "../json/colour.json";

const Banner = () => {
  const titles = [
    "JOIN US HERE AT UTP!",
    "BE PART OF THE MOVEMENT",
    "CULTIVATING SUSTAINABLE VOLUNTEERISM",
  ];

  const [index, setIndex] = useState(0);

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 4000); // change every 4s
    return () => clearInterval(interval);
  }, [titles.length]);

  const prevTitle = () =>
    setIndex((prev) => (prev - 1 + titles.length) % titles.length);
  const nextTitle = () => setIndex((prev) => (prev + 1) % titles.length);

  // read banner colour settings from json (with sensible fallbacks)
  const cfg = colour?.banner || {};
  const bannerBg = cfg.bg ?? "#FF0000";
  const chevronColor = cfg.chevron ?? "#FFFFFF";
  const titleColor = cfg.title ?? "#FFFFFF";

  return (
    <div
      className="absolute top-0 left-0 z-10 w-full h-[15vh] flex items-center px-4 sm:px-8 md:px-15"
      style={{ backgroundColor: bannerBg }}
    >
      {/* Left Chevron - Fixed Width */}
      <button
        onClick={prevTitle}
        className="p-2 hover:opacity-90 flex-shrink-0"
        aria-label="Previous banner title"
      >
        <ChevronLeft
          className="w-6 h-6 sm:w-8 sm:h-8"
          style={{ color: chevronColor }}
        />
      </button>

      {/* Rotating Title - Takes remaining space */}
      <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight text-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            style={{ color: titleColor }}
          >
            {titles[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Right Chevron - Fixed Width */}
      <button
        onClick={nextTitle}
        className="p-2 hover:opacity-90 flex-shrink-0"
        aria-label="Next banner title"
      >
        <ChevronRight
          className="w-6 h-6 sm:w-8 sm:h-8"
          style={{ color: chevronColor }}
        />
      </button>
    </div>
  );
};

export default Banner;
