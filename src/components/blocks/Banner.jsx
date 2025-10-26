import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

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

  return (
    <div className="absolute top-0 left-0 z-10 bg-[#db0025] w-full h-[15vh] flex items-center px-4 sm:px-8 md:px-15">
      {/* Left Chevron - Fixed Width */}
      <button
        onClick={prevTitle}
        className="p-2 hover:text-indigo-400 flex-shrink-0"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Rotating Title - Takes remaining space */}
      <div className="flex-1 flex items-center justify-center px-2 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center leading-tight"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            {titles[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Right Chevron - Fixed Width */}
      <button
        onClick={nextTitle}
        className="p-2 hover:text-indigo-400 flex-shrink-0"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
    </div>
  );
};

export default Banner;
