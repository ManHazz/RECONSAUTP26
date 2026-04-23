import Footer from "../blocks/footer";
import KeyEvents from "./KeyEvents";
import Navbar from "../blocks/header";

const bg = "/bg/batik.png";

const EventsPage = () => {
  return (
    <div
      // Added background utilities so it acts as a static wallpaper
      // Removed overflow-hidden so the document scrolls naturally
      className="relative flex flex-col min-h-screen bg-cover bg-center bg-fixed bg-no-repeat bg-[#2A0510]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar />

      {/* flex-grow tightly wraps the content and pushes the footer to the bottom */}
      <main className="flex-grow pt-[10vh]">
        <KeyEvents />
      </main>

      <Footer />
    </div>
  );
};

export default EventsPage;
