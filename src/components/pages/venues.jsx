import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const venues = [
  { id: "01", title: "Perak", bg: "/venue/Ipoh.jpg" },
  {
    id: "02",
    title: "Universiti Teknologi Petronas",
    bg: "/venue/utp.jpg",
  },
  { id: "03", title: "Kuala Lumpur", bg: "/venue/KualaLumpur.jpeg" },
];

export default function Venues() {
  const [active, setActive] = useState(2);

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] flex overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={venues[active].bg}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${venues[active].bg})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40" />

      {/* Columns */}
      <div className="relative z-10 flex w-full">
        {venues.map((venue, i) => (
          <div
            key={venue.id}
            className="flex-1 border-l border-white/40 flex items-end p-3 sm:p-4 md:p-6 relative group cursor-pointer"
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <div className="w-full">
              <p className="text-white/80 font-bold mb-1 sm:mb-2 text-xs sm:text-sm">
                {venue.id}
              </p>

              <motion.h2
                key={venue.title}
                initial={{ y: 20, opacity: 0, fontWeight: "normal" }}
                animate={{ y: 0, opacity: 1, fontWeight: "bold" }}
                transition={{
                  type: "tween",
                  stiffness: 200,
                  damping: 15,
                }}
                className="text-white text-xs sm:text-sm md:text-xl lg:text-2xl leading-tight"
              >
                {venue.title}
              </motion.h2>

              {/* Explore button only on active */}
              {active === i && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 sm:mt-3 md:mt-4 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-xs sm:text-sm cursor-pointer transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      `https://google.com/search?q=${encodeURIComponent(
                        venue.title
                      )}`,
                      "_blank"
                    );
                  }}
                >
                  Explore →
                </motion.button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
