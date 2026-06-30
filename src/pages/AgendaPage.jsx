import Agenda from "@/components/blocks/AgendaComp";
import Footer from "@/components/blocks/Footer";
import Navbar from "@/components/blocks/Header";
import data from "@/data/agenda.json";

const bg = "/bg/batik.png";

const AgendaPage = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#461B61] bg-cover bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(70,27,97,0.55), rgba(70,27,97,0.65)), url(${bg})`,
      }}
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
