import subThemesData from "@/data/subTheme.json";

export default function SubThemes() {
  return (
    <section className="relative w-full min-h-screen bg-[#461B61] flex flex-col items-center justify-center py-[10vh] px-[6vw] overflow-hidden">
      {/* Soft lighting overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9f44db] rounded-full filter blur-[150px] opacity-40 pointer-events-none" />

      {/* Main split layout container */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* ==================== LEFT HALF: Theme Text ==================== */}
        <div className="col-span-1 md:col-span-5 md:sticky md:top-[14vh] flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-6 tracking-tighter">
            RECONSA26
            <br />
            <span className="text-[#E6B3FF]">Theme</span>
          </h2>
          <p className="text-xl md:text-3xl font-bold text-white/90 leading-snug max-w-lg">
            Cultivating Sustainable Volunteerism: The Evolution of Youth
            Activism
          </p>
        </div>

        {/* ==================== RIGHT HALF: Sub Themes ==================== */}
        <div className="col-span-1 md:col-span-7 flex flex-col items-end w-full">
          <h3 className="text-2xl md:text-4xl font-black italic uppercase text-white mb-8 text-right w-full">
            Sub Themes
          </h3>

          <ul className="w-full max-w-2xl flex flex-col gap-5 md:gap-7">
            {subThemesData.map((theme) => (
              <li
                key={theme.id}
                className="w-full overflow-hidden rounded-2xl md:rounded-[1.75rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
              >
                <img
                  src={theme.sdgImage}
                  alt={`SDG ${theme.sdgNumber}: ${theme.title} — ${theme.description}`}
                  className="block w-full h-auto"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
