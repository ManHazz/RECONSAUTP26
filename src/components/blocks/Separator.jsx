import React from "react";

const Separator = ({
  orientation = "horizontal", // "horizontal" | "vertical"
  thickness = "1px",
  length = "100%", // width if horizontal, height if vertical
  color = "#e5e7eb", // default Tailwind gray-300
  margin = "my-4", // Tailwind spacing classes like my-4, mx-2, etc.
  rounded = false,
  dashed = false,
  className = "",
}) => {
  const isVertical = orientation === "vertical";
  const style = isVertical
    ? {
        width: thickness,
        height: length,
        backgroundColor: dashed ? "transparent" : color,
        borderLeft: dashed ? `${thickness} dashed ${color}` : undefined,
        borderRadius: rounded ? "9999px" : undefined,
      }
    : {
        height: thickness,
        width: length,
        backgroundColor: dashed ? "transparent" : color,
        borderTop: dashed ? `${thickness} dashed ${color}` : undefined,
        borderRadius: rounded ? "9999px" : undefined,
      };

  return <div className={`${margin} ${className}`} style={style} />;
};

export default Separator;
