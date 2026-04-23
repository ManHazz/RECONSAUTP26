import Agenda from "../blocks/AgendaComp";
import Footer from "../blocks/footer";
import Navbar from "../blocks/header";
import data from "../json/agenda.json";

const bg = "/bg/batik.png";

const AgendaPage = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar onScrollTo={() => {}} />

        <main className="flex-grow">
          <Agenda data={data} />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AgendaPage;
