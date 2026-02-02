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
        <h3
          style={{
            margin: 0,
            color: "#ffffff",
            textTransform: "uppercase",
            fontSize: "1rem",
            fontWeight: "800",
            letterSpacing: "1px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {titulo}
        </h3>

        <div><StarRating nota={puntuacion} size="1rem" /></div>

        <p
          style={{
            margin: 0,
            color: "#9ca3af",
            fontSize: "0.9rem",
            fontFamily: "m6x11plus",
            marginTop: "2px",
          }}
        >
          {contenido}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
