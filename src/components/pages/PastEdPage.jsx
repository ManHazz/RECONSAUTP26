import Footer from "../blocks/footer";
import Navbar from "../blocks/header";
import DomeGallery from "../DomeGallery";
import { motion } from "framer-motion";

const PastEdPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800">
      <Navbar />

      {/* Hero Dome Section */}
      <div className="relative flex flex-col items-center justify-center text-center h-screen bg-indigo-900 overflow-hidden">
        {/* Title Overlay */}
        <motion.h1
          className="absolute z-10 text-5xl md:text-7xl font-extrabold text-white"
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
        <DomeGallery
          fit={1}
          grayscale={true}
          padFactor={5}
          segments={30}
          minRadius={750}
        />
      </div>

      <div className="bg-[#060010] w-full h-screen"></div>
      <Footer />
    </div>
  );
};

export default PastEdPage;
