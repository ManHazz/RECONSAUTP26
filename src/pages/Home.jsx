import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import CustomButton from "@/components/blocks/CustomButton";
import data from "@/data/Home.json";

// Hero background slideshow — high-res RECONSA event photos
const bgImages = [
  "/images/gala_night.jpg",
  "/images/exhibition_networking.jpg",
  "/images/pitching_seminar.jpg",
  "/images/cultural_exchange.jpg",
  "/images/usr_engagement.jpg",
  "/images/parallel_talk.jpg",
  "/images/cultural_workshop.jpg",
  "/images/kl_trip.jpg",
  "/images/roundtable.jpg",
  "/images/parallel_presentation.jpg",
];

// Fisher–Yates shuffle — randomizes the slideshow order on each visit
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Hero() {
  const slides = useMemo(() => shuffle(bgImages), []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance the background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change image every 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 h-screen overflow-hidden bg-[#461B61]">
      {/* LAYER 1: Deepest Background (The fading/sliding slideshow) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={slides[currentImageIndex]}
            alt="Dynamic Background"
            className="absolute inset-0 w-full h-full object-cover"
            // Start slightly to the left and invisible
            initial={{ opacity: 0, x: "-5%" }}
            // Fade in and settle at center
            animate={{ opacity: 1, x: "0%" }}
            // Fade out and slide to the right
            exit={{ opacity: 0, x: "5%" }}
            // Smooth, slow transition for that premium feel
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* LAYER 2: Middle Background (Static Overlay Image or Gradient) */}
      {/* You can replace 'bg-black/60' with a static image if you want a textured overlay.
        For example: className="absolute inset-0 z-0 bg-[url('/your-overlay-pattern.png')] bg-cover opacity-80"
        I added a purple-to-black gradient fade here to blend your original theme with the photos.
      */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#461B61]/60 to-[#050505]/80 pointer-events-none"></div>

      {/* LAYER 3: Hero Content (Your existing text and buttons) */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Placement */}
        <motion.img
          src={data.logo}
          alt="RECONSA Logo"
          className="h-14 md:h-24 mb-6 object-contain"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* Title */}
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {data.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-white/90 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {data.desc}
        </motion.p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <CustomButton variant="primary">Register Now</CustomButton>
          <CustomButton variant="secondary">
            <a href="/agenda">View Agenda</a>
          </CustomButton>
        </div>

        {/* Event Info */}
        <div className="mt-10 flex flex-wrap gap-6 justify-center text-sm text-indigo-100 drop-shadow-md">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-300" />
            <span>{data.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-pink-300" />
            <span>{data.venue}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
