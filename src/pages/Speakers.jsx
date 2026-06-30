import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import speakersData from "@/data/speakers.json";

export default function Speakers() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth + 200 : clientWidth - 200;

      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-[#fafafa] py-16 px-4 md:px-12 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto relative">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a3673] mb-10 pl-2">
          Our Past Speakers
        </h2>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-[-20px] md:left-[-40px] top-1/2 -translate-y-1/2 z-10 p-2 text-[#3b82f6] hover:text-[#1a3673] transition-colors bg-transparent opacity-70 hover:opacity-100 hidden md:block"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-10 h-10" strokeWidth={1.5} />
          </button>

          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 mx-5"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {speakersData.map((speaker) => (
              <div
                key={speaker.id}
                // FIXED: Using percentages guarantees exactly 2 items fit perfectly within the container width,
                // regardless of padding or margins. (50% minus half the 16px gap)
                className="flex-none w-[calc(50%-8px)] sm:w-[45vw] md:w-[30vw] lg:w-[calc(20%-1.2rem)] snap-start flex flex-col"
              >
                {/* Speaker Image (or placeholder) */}
                <div className="w-full aspect-[4/5] bg-gray-200 mb-3 md:mb-4 relative overflow-hidden">
                  {speaker.image ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : null}
                </div>

                {/* Speaker Details */}
                <div className="flex flex-col flex-grow pr-2 gap-1">
                  {speaker.name ? (
                    <h3 className="text-sm md:text-[1.1rem] leading-tight font-bold text-[#1a3673]">
                      {speaker.name}
                    </h3>
                  ) : (
                    <span className="block h-4 w-3/4 rounded bg-gray-200" aria-hidden />
                  )}
                  {speaker.role ? (
                    <p className="text-xs md:text-[0.9rem] leading-snug text-gray-800 whitespace-pre-wrap">
                      {speaker.role}
                    </p>
                  ) : (
                    <span className="block h-3 w-1/2 rounded bg-gray-200" aria-hidden />
                  )}
                  {speaker.organization && (
                    <p className="text-xs md:text-[0.9rem] font-bold text-black leading-snug">
                      {speaker.organization}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-[-20px] md:right-[-40px] top-1/2 -translate-y-1/2 z-10 p-2 text-[#3b82f6] hover:text-[#1a3673] transition-colors bg-transparent opacity-70 hover:opacity-100 hidden md:block"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-10 h-10" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `,
        }}
      />
    </section>
  );
}
