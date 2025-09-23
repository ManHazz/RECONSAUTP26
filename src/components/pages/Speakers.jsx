import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SpeakerCard({ name, role, img }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-3 sm:p-6 text-center hover:scale-105 transition-transform max-w-xs sm:max-w-sm mx-auto w-full">
      <div className="w-full aspect-square overflow-hidden rounded-xl mb-3 sm:mb-4">
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-base sm:text-xl font-semibold">{name}</h3>
      <p className="text-xs sm:text-sm text-indigo-200">{role}</p>
    </div>
  );
}

export default function Speakers() {
  const allSpeakers = [
    { name: "Dr. Elise Tan", role: "Keynote Speaker", img: "/elise.jpg" },
    { name: "Markus Lee", role: "Tech Visionary", img: "/markus.jpg" },
    { name: "Sophia Grant", role: "AI Innovator", img: "/sophia.jpg" },
    { name: "Liam Wong", role: "Creative Futurist", img: "/liam.jpg" },
    { name: "Aisha Rahman", role: "Cybersecurity Expert", img: "/aisha.jpg" },
    { name: "Carlos Vega", role: "Data Scientist", img: "/carlos.jpg" },
    { name: "Maya Chen", role: "Cloud Specialist", img: "/maya.jpg" },
    { name: "David Noor", role: "Blockchain Pioneer", img: "/david.jpg" },
  ];

  const [visibleCount, setVisibleCount] = useState(6);
  const [start, setStart] = useState(0);

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
            className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full z-10"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {start < allSpeakers.length - visibleCount && (
          <button
            onClick={handleNext}
            className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 sm:p-3 rounded-full z-10"
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
