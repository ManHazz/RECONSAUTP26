import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Dither from "../Dither";
import CustomButton from "../blocks/CustomButton";
import data from "../json/landing.json";
import bgData from "../json/bg.json";
import colours from "../json/colour.json"; // <-- added import

export default function Hero() {
  const cfg = colours?.hero || {};
  const titleColor = cfg.title ?? ""; // empty fallback uses default CSS
  const descColor = cfg.desc ?? "rgba(255,255,255,0.9)";

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 h-screen overflow-hidden">
      {/* Dither Background : changed to normal img from json*/}
      <div className="absolute inset-0 z-0">
        <img
          src={bgData.hero_bg}
          alt="reconsautp26 bg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={titleColor ? { color: titleColor } : {}}
        >
          {data.title}
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ color: descColor }}
        >
          {data.desc}
        </motion.p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <CustomButton variant="primary">Register Now</CustomButton>
          <CustomButton variant="secondary">
            <a href="/agenda">View Agenda</a>
          </CustomButton>
        </div>

        {/* Event Info */}
        <div className="mt-10 flex flex-wrap gap-6 justify-center text-sm text-indigo-200">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>{data.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-pink-400" />
            <span>{data.venue}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
