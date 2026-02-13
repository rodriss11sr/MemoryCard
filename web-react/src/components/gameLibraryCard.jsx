import React, { useState } from "react";
import StarRating from "./StarRating";

const GameLibraryCard = ({ titulo, portada, puntuacion }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle = {
    width: "160px",
    borderRadius: "12px",
    padding: "10px",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
    justifyContent: "center",
    backgroundColor: isHovered ? "#2b303b" : "transparent",
    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
    boxShadow: isHovered ? "0 4px 8px rgba(0,0,0,0.2)" : "none",
  };

  const imageStyle = {
    width: "100%",
    aspectRatio: "2/3",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "5px",
    backgroundColor: "#1a1a1a",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={portada} alt={titulo} style={imageStyle} />
      {puntuacion !== undefined && puntuacion !== null && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <StarRating nota={puntuacion / 2} size="0.9rem" />
        </div>
      )}
    </div>
  );
};

export default GameLibraryCard;
