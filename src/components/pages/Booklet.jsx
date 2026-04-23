import CompanyCarousel from "../blocks/LogoCarousel";
import CustomButton from "../blocks/CustomButton";

export default function Booklet() {
  return (
    <section className="relative flex flex-col items-center text-center backdrop-blur-xl pb-6">
      {/* Content */}
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto px-6 mt-12 mb-12">
        <img
          src={"/booklet/booklet.png"}
          alt="booklet photo"
          className="w-[250px] md:w-[20vw] h-[400px] md:h-[80vh] mr-5 md:mr-15 object-cover rounded-xl"
        />
        <div className="text-start">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            RECONSA 2026 Info Pack
          </h2>
          <p className="max-w-xl text-indigo-200 mb-8">
            Join innovators, developers, and leaders shaping tomorrow’s
            technology landscape.
          </p>
          <CustomButton variant="primary">Download Info Pack</CustomButton>
        </div>
      </div>
    </section>
  );
}
