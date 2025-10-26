import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Dither from "../Dither";
import CustomButton from "../blocks/CustomButton";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 h-screen bg-indigo-900 overflow-hidden">
      {/* Dither Background */}
      <div className="absolute inset-0 z-0 mix-blend-multiply">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={0.15}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          RECONSA UTP 2026
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Cultivating Sustainable Volunteerism: The Evolution of Youth Activism
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
            <span>5 - 10 June 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-pink-400" />
            <span>Universiti Teknologi Petronas, Perak</span>
          </div>
        </div>
      </div>
    </section>
  );
}
