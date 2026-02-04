import React from "react";
import StarRating from "./starRating.jsx";

const ReviewCard = ({ titulo, contenido, puntuacion, imagen }) => {

  const cardStyle = {
    display: "flex",
    backgroundColor: "#2b303b",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "15px",
    border: "1px solid #3e4451",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    height: "120px",
    alignItems: "center",
  };

  const imageContainerStyle = {
    width: "85px",
    height: "100%",
    flexShrink: 0,
    backgroundColor: "#1a1a1a",
  };

  const contentStyle = {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "5px",
  };

  return (
    <div style={cardStyle}>
      <div style={imageContainerStyle}>
        {imagen ? (
          <img
            src={imagen}
            alt={titulo}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#555",
            }}
          >
            🎮
          </div>
        )}
      </div>

      <div style={contentStyle}>
        <span
          style={{
            color: "#ffffff",
            fontWeight: "800",
            fontSize: "1.3rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontFamily: "upheaval, system-ui",
          }}
        >
          {titulo}
        </span>

        <div><StarRating nota={puntuacion} size="1rem" /></div>

        <span
          style={{
            color: "#9ca3af",
            fontFamily: "m6x11plus, system-ui",
            fontSize: "1.0rem",
            marginTop: "2px",
            fontWeight: "500",
          }}
        >
          {contenido}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
