import { motion } from "framer-motion";
import Banner from "../blocks/Banner";

export default function About() {
  return (
    <section className="relative h-screen flex flex-col md:flex-row px-[6vw] pt-[20vh] bg-gradient-to-b from-indigo-900 to-indigo-800">
      <Banner />

      {/* About Section Content */}
      <div className="max-w-5xl flex flex-col md:flex-row items-start w-full">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 md:mr-[10vw]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About <br />
          RECONSA
        </motion.h2>
        {/* Description: below title on mobile, right on desktop */}
        <motion.p
          className="text-indigo-200 text-left text-base md:text-xl leading-relaxed mt-2 md:mt-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          RECONSA UTP 2026 brings together youth leaders, innovators, and
          changemakers to cultivate sustainable volunteerism. Through
          conferences, workshops, and networking, we explore how youth activism
          is evolving and how collective action can shape a better tomorrow.
        </motion.p>
      </div>
    </section>
  );
}
