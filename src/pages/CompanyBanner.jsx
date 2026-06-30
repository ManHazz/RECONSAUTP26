import LogoCarousel from "@/components/blocks/LogoCarousel";

const CompanyBanner = ({ title }) => {
  return (
    <section className=" w-full pb-[5vh]">
      <h1 className="flex justify-center items-center pt-[5vh] pb-[5vh] font-Poppins font-bold text-white text-4xl text-center">
        {title}
      </h1>
      <LogoCarousel />
    </section>
  );
};

export default CompanyBanner;
