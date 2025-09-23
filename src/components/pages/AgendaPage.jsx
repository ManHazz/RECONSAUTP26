import Agenda from "../blocks/AgendaComp";
import Footer from "../blocks/footer";
import Navbar from "../blocks/header";
import data from "../json/agenda.json";

const AgendaPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800">
      <Navbar onScrollTo={() => {}} /> {/* Navbar still required */}
      <Agenda data={data} />
      <Footer />
    </div>
  );
};

export default AgendaPage;
