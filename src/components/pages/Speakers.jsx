import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../json/speakers.json";

function SpeakerCard({ name, role, img, bio, expertise }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative max-w-xs sm:max-w-sm mx-auto w-full cursor-pointer"
      style={{ perspective: "1000px", aspectRatio: "3/4" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* Front of Card */}
        <div
          className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl items-center p-3 sm:p-6 
                    text-center hover:scale-105 transition-transform 
                    flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full aspect-square overflow-hidden rounded-xl mb-3 sm:mb-4">
            <img src={img} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <h3 className="text-base sm:text-xl font-semibold">{name}</h3>
            <p className="text-xs sm:text-sm text-indigo-200">{role}</p>
          </div>
        </div>

        {/* Back of Card */}
        <div
          className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl p-3 sm:p-6 
                    flex flex-col overflow-y-auto"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-base sm:text-xl font-semibold mb-2">{name}</h3>
          <p className="text-xs sm:text-sm text-indigo-200 mb-3 sm:mb-4">
            {role}
          </p>

          {bio && (
            <div className="mb-3 sm:mb-4">
              <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-indigo-100">
                About
              </h4>
              <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
                {bio}
              </p>
            </div>
          )}

          {expertise && expertise.length > 0 && (
            <div>
              <h4 className="text-sm sm:text-base font-semibold mb-1 sm:mb-2 text-indigo-100">
                Expertise
              </h4>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {expertise.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-indigo-500/30 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-indigo-300 mt-auto pt-3">
            Click to flip back
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Speakers() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [start, setStart] = useState(0);

  const allSpeakers = data;

  useEffect(() => {
    const updateCount = () => {
      setVisibleCount(window.innerWidth < 640 ? 4 : 6);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const handlePrev = () => setStart((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setStart((prev) => Math.min(prev + 1, allSpeakers.length - visibleCount));

  const currentSpeakers = allSpeakers.slice(start, start + visibleCount);

  return (
    <section className="w-full px-6 py-16 max-w-6xl mx-auto relative">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Meet the Speakers
      </h2>

      <div className="relative px-8 sm:px-12">
        {/* Chevron Controls */}
        {start > 0 && (
          <button
            onClick={handlePrev}
            className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full cursor-pointer z-10"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {start < allSpeakers.length - visibleCount && (
          <button
            onClick={handleNext}
            className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full z-10 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Speaker Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={start}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {currentSpeakers.map((s, i) => (
              <SpeakerCard key={i} {...s} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
