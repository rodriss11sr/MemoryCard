import { useState } from "react";
import StarRating from "./starRating.jsx";

const UserReviewCard = ({ titulo, contenido, puntuacion, imagen }) => {

  //Estilo de la tarjeta
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

  //Contenido de la reseña
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((v) => !v);
  const onKeyDownToggle = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpanded();
    }
  };
  const descStyle = {
    color: "#d1d5db",
    fontSize: "0.9rem",
    margin: "5px 0 0 0",
    marginTop: "2px",
    fontWeight: "500",
    cursor: "pointer",
    display: "-webkit-box",
    WebkitLineClamp: expanded ? "unset" : 3,
    WebkitBoxOrient: "vertical",
    overflow: expanded ? "visible" : "hidden",
    textOverflow: "ellipsis",
    whiteSpace: expanded ? "normal" : "initial",
  };



  // Estilos para la imagen del juego
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

        <p
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          onClick={toggleExpanded}
          onKeyDown={onKeyDownToggle}
          style={descStyle}
        >
          {contenido}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <StarRating nota={puntuacion} size="1.2rem" />
        <span
          style={{
            color: "#9ca3af",
            fontSize: "0.85rem",
            marginLeft: "5px",
          }}
        >
          {puntuacion}
        </span>
      </div>

    </div>
  );
};

export default UserReviewCard;
