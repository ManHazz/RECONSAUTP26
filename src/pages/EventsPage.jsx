import Footer from "@/components/blocks/Footer";
import KeyEventsTimeline from "@/components/blocks/key-events-timeline";
import Navbar from "@/components/blocks/Header";

const EventsPage = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-[#461B61] text-white">
      <Navbar />

      <main className="flex-grow">
        <KeyEventsTimeline />
      </main>

      <Footer />
    </div>
  );
};

export default EventsPage;
