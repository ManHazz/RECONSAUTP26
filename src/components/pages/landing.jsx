import Navbar from "../blocks/header";
import Venues from "./venues";
import Speakers from "./Speakers";
import Booklet from "./Booklet";
import Footer from "../blocks/footer";
import { Home } from "lucide-react";

export default function ConferenceLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800 text-white">
      <Navbar />
      <Home />
      <Speakers />
      <Venues />
      <Booklet />
      <Footer />
    </div>
  );
}
