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
    <div className="absolute top-0 left-0 z-10 bg-[#db0025] w-full h-[15vh] flex items-center justify-between gap-6 px-15">
      {/* Left Chevron */}
      <button onClick={prevTitle} className="p-2 hover:text-indigo-400">
        <ChevronLeft size={35} />
      </button>

      {/* Rotating Title */}
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            className="text-2xl md:text-3xl font-bold text-white"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            {titles[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Right Chevron */}
      <button onClick={nextTitle} className="p-2 hover:text-indigo-400">
        <ChevronRight size={35} />
      </button>
    </div>
  );
};

export default Banner;
