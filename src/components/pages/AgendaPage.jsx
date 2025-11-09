import Agenda from "../blocks/AgendaComp";
import Footer from "../blocks/footer";
import Navbar from "../blocks/header";
import data from "../json/agenda.json";
import bgData from "../json/bg.json";

const AgendaPage = () => {
  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 z-0">
        <img
          src={bgData.agenda_bg}
          alt="reconsautp26 bg"
          className="w-full h-full object-cover"
        />
      </div>
      <Navbar onScrollTo={() => {}} /> {/* Navbar still required */}
      <Agenda data={data} />
      <Footer />
    </div>
  );
};

export default AgendaPage;
