import { motion } from "framer-motion";
import Banner from "../blocks/Banner";
import data from "../json/landing.json";
import bgData from "../json/bg.json";
import colours from "../json/colour.json"; // <-- added

export default function About() {
  const cfg = colours?.abouts || {}; // read from json
  const titleColor = cfg.title ?? "#EDE9FE";
  const descColor = cfg.desc ?? "#CBD5E1";

  return (
    <section className="relative h-screen md:flex-row px-[6vw] pt-[20vh]">
      <Banner />

      {/* About Section Content */}
      <div className="max-w-5xl flex flex-col md:flex-row md:items-start w-full mb-15">
        {/* custom background from json */}
        <div className="absolute inset-0">
          <img
            src={bgData.abouts_bg}
            alt="about reconsautp26 bg"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 md:w-[280px] md:flex-shrink-0 z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ color: titleColor }}
        >
          About <br />
          RECONSA
        </motion.h2>
        {/* Description: below title on mobile, right on desktop */}
        <motion.p
          className="text-left text-base md:text-xl leading-relaxed mt-2 md:mt-0 md:ml-8 z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ color: descColor }}
        >
          Is a conference attended by young leaders, referred to as Delegates to
          share perspective by showcasing ideas and past activism projects with
          a parallel goal to achieve sustainable volunteerism. It is also a
          platform where passionate youth gather in one place with a similar
          aim, that is to equip essential skills, facilitate networking and
          pursue grant opportunities.
        </motion.p>
      </div>

      {/* Themes */}
      <div className="max-w-5xl flex flex-col md:flex-row md:items-start w-full z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 md:w-[280px] md:flex-shrink-0 z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ color: titleColor }}
        >
          Our <br />
          THEMES
        </motion.h2>
        {/* Description: below title on mobile, right on desktop */}
        <motion.p
          className="text-left text-base md:text-xl leading-relaxed mt-2 md:mt-0 md:ml-8 z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          style={{ color: descColor }}
        >
          Cultivating Sustainable Volunteerism: The Evolution of Youth Activism
        </motion.p>
      </div>
    </section>
  );
}
