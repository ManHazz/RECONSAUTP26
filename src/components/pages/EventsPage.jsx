import Footer from "../blocks/footer";
import KeyEvents from "./KeyEvents";
import Navbar from "../blocks/header";
import bgData from "../json/bg.json";

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="absolute inset-0 z-0">
        <img
          src={bgData.keyevents_bg}
          alt="reconsautp26 background"
          className="w-full h-full object-cover"
        />
      </div>
      <Navbar />
      <KeyEvents />
      <Footer />
    </div>
  );
};

export default EventsPage;
