import { motion } from "framer-motion";
import Banner from "../blocks/Banner";

export default function About() {
  return (
    <section className="relative h-screen md:flex-row px-[6vw] pt-[20vh] bg-gradient-to-b from-indigo-900 to-indigo-800">
      <Banner />

      {/* About Section Content */}
      <div className="max-w-5xl flex flex-col md:flex-row md:items-start w-full mb-15">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 md:w-[280px] md:flex-shrink-0"
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
          className="text-indigo-200 text-left text-base md:text-xl leading-relaxed mt-2 md:mt-0 md:ml-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
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
      <div className="max-w-5xl flex flex-col md:flex-row md:items-start w-full">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 md:w-[280px] md:flex-shrink-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our <br />
          THEMES
        </motion.h2>
        {/* Description: below title on mobile, right on desktop */}
        <motion.p
          className="text-indigo-200 text-left text-base md:text-xl leading-relaxed mt-2 md:mt-0 md:ml-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Cultivating Sustainable Volunteerism: The Evolution of Youth Activism
        </motion.p>
      </div>
    </section>
  );
}
