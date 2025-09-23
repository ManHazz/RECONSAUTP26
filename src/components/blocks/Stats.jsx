import Separator from "./Separator.jsx";

const Stats = () => {
  return (
    <div className="w-full md:h-[15vh] bg-white flex justify-around items-center">
      <span className="font-Poppins text-2xl font-semibold">
        4000+ applicants
      </span>
      <Separator
        orientation="vertical"
        thickness="2px"
        color="#111111"
        length="80%"
      />
      <span className="font-Poppins text-2xl font-semibold">
        4000+ applicants
      </span>
      <Separator
        orientation="vertical"
        thickness="2px"
        color="#111111"
        length="80%"
      />
      <span className="font-Poppins text-2xl font-semibold">
        4000+ applicants
      </span>
    </div>
  );
};

export default Stats;
