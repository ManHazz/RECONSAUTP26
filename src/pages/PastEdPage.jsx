import Footer from "@/components/blocks/Footer";
import Navbar from "@/components/blocks/Header";
import DomeGallery from "@/components/DomeGallery";
import { motion } from "framer-motion";

const bg = "/bg/batik.png";

const PastEdPage = () => {
  return (
    <div className="min-h-screen bg-[#060010] overflow-x-hidden">
      <Navbar />

      {/* Hero Dome Section — clip-path forces the 3D-transformed dome tiles
          to actually clip at the section bounds (overflow:hidden alone leaks
          on transformed children in some browsers). */}
      <div
        className="relative flex flex-col items-center justify-center text-center h-screen overflow-hidden isolate"
        style={{ clipPath: "inset(0)" }}
      >
        {/* Bottom fade so the dome blends into the next section instead of cutting hard */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 z-[15] bg-gradient-to-b from-transparent via-[#060010]/80 to-[#060010]"
        />
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={bg}
            className="w-full h-full object-cover"
            alt="past editions bg"
          />
        </div>

        {/* Title Overlay */}
        <motion.h1
          className="relative z-20 text-5xl md:text-7xl font-extrabold text-white"
          style={{
            textShadow: "0 0 20px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)",
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          RECONSA UTP <br /> PAST EDITIONS
        </motion.h1>

        {/* Dome Background */}
        <div className="absolute inset-0 z-10">
          <DomeGallery
            fit={1}
            grayscale={false}
            padFactor={5}
            segments={30}
            minRadius={750}
          />
        </div>
      </div>

      <div className="bg-[#060010] w-full h-screen flex items-center justify-center z-11">
        <video
          src="/videos/Reconsa 25 Montage Final.mp4"
          controls
          className="w-full h-full object-contain rounded-xl shadow-lg"
        />
      </div>
      <Footer />
    </div>
  );
};

export default PastEdPage;
