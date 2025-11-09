import React from "react";

const ShinyText = ({
  text,
  color = "#FFFFFF",
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  // Build a gradient that uses the provided color as base and a bright center highlight
  const gradient = `linear-gradient(
    120deg,
    ${color} 0%,
    ${color} 40%,
    rgba(255,255,255,0.9) 50%,
    ${color} 60%,
    ${color} 100%
  )`;

  if (disabled) {
    // simple colored text when disabled
    return (
      <div className={`inline-block ${className}`} style={{ color }}>
        {text}
      </div>
    );
  }

  // shining version: text is transparent so background shows through
  return (
    <div
      className={`bg-clip-text inline-block animate-shine ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        animationDuration,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
