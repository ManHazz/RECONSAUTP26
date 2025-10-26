import LogoCarousel from "../blocks/LogoCarousel";

const CompanyBanner = ({ title }) => {
  return (
    <section className=" w-full pb-[15vh]">
      <h1 className="flex justify-center items-center pt-[5vh] pb-[10vh] font-Poppins font-bold text-white text-4xl text-center">
        {title}
      </h1>
      <LogoCarousel />
    </section>
  );
};

export default CompanyBanner;
