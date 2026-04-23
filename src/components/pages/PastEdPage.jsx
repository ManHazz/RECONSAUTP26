import Footer from "../blocks/footer";
import Navbar from "../blocks/header";
import DomeGallery from "../DomeGallery";
import { motion } from "framer-motion";

const bg = "/bg/batik.png";

const PastEdPage = () => {
  return (
    <div className="min-h-screen bg-[#060010]">
      <Navbar />

      {/* Hero Dome Section */}
      <div className="relative flex flex-col items-center justify-center text-center h-screen">
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

      <div className="bg-[#060010] w-full h-screen flex items-center justify-center">
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
