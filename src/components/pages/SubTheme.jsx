import React, { useState } from "react";
import { motion } from "framer-motion";
import subThemesData from "../json/subTheme.json";

export default function SubThemes() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="relative w-full min-h-screen bg-[#461B61] flex flex-col items-center justify-center py-[10vh] px-[6vw] overflow-hidden">
      {/* Soft lighting overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9f44db] rounded-full filter blur-[150px] opacity-40 pointer-events-none" />

      {/* Main split layout container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* ==================== LEFT HALF: Theme Text ==================== */}
        <motion.div
          className="col-span-1 md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-6 tracking-tighter">
            RECONSA26
            <br />
            <span className="text-[#E6B3FF]">Theme</span>
          </h2>
          <p className="text-xl md:text-3xl font-bold text-white/90 leading-snug max-w-lg">
            Cultivating Sustainable Volunteerism: The Evolution of Youth
            Activism
          </p>
        </motion.div>

        {/* ==================== RIGHT HALF: Sub Theme Reveal ==================== */}
        <motion.div
          className="col-span-1 md:col-span-7 flex flex-col items-end w-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-2xl md:text-4xl font-black italic uppercase text-white mb-8 text-right w-full">
            Sub Theme Reveal
          </h3>

          <div className="w-full max-w-2xl flex flex-col gap-8 md:gap-10">
            {subThemesData.map((theme) => {
              const isActive = activeId === theme.id;

              return (
                <motion.div
                  key={theme.id}
                  className="relative w-full rounded-[2rem] md:rounded-[4rem] border border-white/10 overflow-hidden bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
                  onMouseEnter={() => setActiveId(theme.id)}
                  onClick={() => setActiveId(theme.id)}
                >
                  {/* The Sliding Container */}
                  <motion.div
                    className="relative w-full flex"
                    variants={{
                      initial: { x: "calc(100% - 110px)" }, // 110px is the width of the number tab
                      active: { x: "0%" }, // Slides completely into view
                    }}
                    initial="initial"
                    animate={isActive ? "active" : "initial"}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* 1. The Full Image Banner */}
                    <img
                      src={theme.sdgImage}
                      alt={`SDG ${theme.sdgNumber || theme.title}`}
                      className="w-full h-auto object-cover block"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />

                    {/* 2. The Number Tab */}
                    <motion.div
                      className="absolute top-0 left-0 w-[110px] h-full bg-[#2a0e3b] flex flex-col items-center justify-center border-r border-white/10 z-10"
                      variants={{
                        initial: { opacity: 1 },
                        // FIXED: Added a 0.1s delay and extended duration to perfectly sync with the 0.5s slide
                        active: {
                          opacity: 0,
                          transition: {
                            duration: 0.4,
                            delay: 0.1,
                            ease: "easeOut",
                          },
                        },
                      }}
                      animate={isActive ? "active" : "initial"}
                    >
                      <span className="text-4xl md:text-5xl font-black text-[#E6B3FF] italic leading-none">
                        {theme.sdgNumber}
                      </span>
                      <span className="text-xs md:text-sm font-bold text-white tracking-widest mt-1 uppercase">
                        SDG
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
