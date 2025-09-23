import { useState, useEffect } from "react";

const ImageCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [images]);

  const nextImage = () => {
    setCurrentImageIndex((p) => (p + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);
  };

  const goToImage = (i) => {
    setCurrentImageIndex(i);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Main wrapper */}
      <div className="flex items-center space-x-4">
        {/* Prev button OUTSIDE */}
        {images.length > 1 && (
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full shadow-md"
          >
            ‹
          </button>
        )}

        {/* Image */}
        <div
          className="
            relative overflow-hidden rounded-xl
            shadow-[0_15px_40px_rgba(0,0,0,0.4)]
            w-[320px] h-[220px]
            sm:w-[400px] sm:h-[280px]
            md:w-[500px] md:h-[350px]
          "
        >
          <img
            src={images[currentImageIndex]}
            alt={`Event image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover select-none"
            draggable="false"
          />

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
              {currentImageIndex + 1}/{images.length}
            </div>
          )}
        </div>

        {/* Next button OUTSIDE */}
        {images.length > 1 && (
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full shadow-md"
          >
            ›
          </button>
        )}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="mt-3 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentImageIndex
                  ? "bg-black scale-125"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
