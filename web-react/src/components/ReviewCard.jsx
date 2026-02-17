import { useState } from "react";
import StarRating from "./StarRating";

function ReviewCard({ imagen, titulo, usuario, contenido, puntuacion, avatar }) {

  //Estilo de la tarjeta
  const cardStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    backgroundColor: "#2b303b",
    border: "1px solid #3e4451",
    borderRadius: "12px",
    padding: "1.5rem",
    width: "100%",
    maxWidth: "600px",
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

  return (
    <div style={cardStyle}>
      {/* Imagen del juego a la izquierda */}
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

      {/* Contenido a la derecha */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Header con avatar y usuario */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img
            src={avatar}
            alt={usuario}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid #3e4451",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.95rem",
                fontFamily: "upheaval, system-ui",
                letterSpacing: "0.5px",
              }}
            >
              {usuario}
            </span>
          </div>
        </div>

        {/* Contenido de la reseña */}
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

        {/* Puntuación con estrellas */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          {puntuacion !== null && puntuacion !== undefined && (
            <StarRating nota={puntuacion / 2} size="1.2rem" />
          )}
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
    </div >
  );
}

export default ReviewCard;
