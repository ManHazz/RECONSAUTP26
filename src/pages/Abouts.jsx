import { motion } from "framer-motion";
import Banner from "@/components/blocks/Banner";
import data from "@/data/abouts.json";

export default function About() {
  return (
    <section className="relative w-full bg-white flex flex-col items-center pt-[10vh] overflow-hidden">
      {/* Top Banner */}
      <div className="w-full">
        <Banner />
      </div>

      {/* About Section Content */}
      <div className="relative z-10 w-full bg-white max-w-5xl px-[6vw] flex flex-col items-center mt-[8vh] pb-8">
        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold italic text-gray-900 mb-6 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          About
        </motion.h2>

        {/* Logo */}
        <motion.img
          src={data.logo}
          alt="RECONSA Logo"
          className="w-full max-w-[50%] md:max-w-xs object-contain mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        />

        {/* Description */}
        <motion.p
          className="text-gray-900 font-bold italic text-center text-sm md:text-lg leading-relaxed max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {data.description}
        </motion.p>
      </div>

      {/* Full Width Group Photo */}
      <motion.div
        className="w-full mt-[-15vh] z-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <img
          src={data.image}
          alt="RECONSA Delegates"
          // object-top ensures the focus stays on faces when cropped
          className="w-full h-auto min-h-[50vh] object-cover object-top"
        />
      </motion.div>
    </section>
  );
}
