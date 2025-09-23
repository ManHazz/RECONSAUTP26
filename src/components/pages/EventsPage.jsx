import Footer from "../blocks/footer";
import KeyEvents from "./KeyEvents";
import Navbar from "../blocks/header";

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800">
      <Navbar />
      <KeyEvents />
      <Footer />
    </div>
  );
};

export default EventsPage;
