import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const venues = [
  { id: "01", title: "Perak", bg: "/ipoh.JPG" },
  {
    id: "02",
    title: "Universiti Teknologi Petronas",
    bg: "/ChancellorHall.png",
  },
  { id: "03", title: "Kuala Lumpur", bg: "/klcc.JPG" },
];

export default function Venues() {
  const [active, setActive] = useState(2); // default active

  return (
    <section className="relative h-[80vh] flex overflow-hidden">
      {/* Background that crossfades */}
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Columns */}
      <div className="relative z-10 flex w-full">
        {venues.map((venue, i) => (
          <div
            key={venue.id}
            className="flex-1 border-l border-white/40 flex items-end p-6 relative group cursor-pointer"
            onMouseEnter={() => setActive(i)}
          >
            <div>
              <p className="text-white/80 font-bold mb-2">{venue.id}</p>

              {/* Springy title */}
              <motion.h2
                key={venue.title}
                initial={{ y: 20, opacity: 0, fontWeight: "normal" }}
                animate={{ y: 0, opacity: 1, fontWeight: "bold" }}
                transition={{
                  type: "tween",
                  stiffness: 200,
                  damping: 15,
                }}
                className="text-white text-lg"
              >
                {venue.title}
              </motion.h2>

              {/* Explore button only on hover */}
              {active === i && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 px-6 py-2 bg-pink-600 text-white rounded-full text-sm"
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
