import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import data from "@/data/companies.json";

const logos = data;
const repeatedLogos = [...logos, ...logos, ...logos];

export default function LogoCarousel() {
  const carouselRef = React.useRef(null);

  React.useEffect(() => {
    if (!carouselRef.current) return;
    const embla = carouselRef.current.api;
    if (!embla) return;

    let rafId;
    const speed = 0.0005;

    const step = () => {
      const progress = (embla.scrollProgress() + speed) % 1;
      embla.scrollTo(progress, true);
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="w-full relative">
      <Carousel
        ref={carouselRef}
        opts={{ align: "center", loop: true, dragFree: true }}
        className="relative w-full px-12 sm:px-14 md:px-16 lg:px-20"
      >
        {/* Logos */}
        <CarouselContent className="gap-0.5">
          {repeatedLogos.map((logo, i) => (
            <CarouselItem
              key={i}
              className="
      flex items-center justify-center
      basis-1/3 sm:basis-1/3 md:basis-1/5 lg:basis-1/7
    "
            >
              <div
                className="
        flex items-center justify-center
        w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
        bg-white rounded-lg shadow text-black
      "
              >
                {logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt || `Company logo ${i + 1}`}
                    className="max-w-[70%] max-h-[70%] object-contain"
                  />
                ) : (
                  <span aria-hidden className="block w-3/5 h-3/5 rounded-md bg-gray-100" />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
