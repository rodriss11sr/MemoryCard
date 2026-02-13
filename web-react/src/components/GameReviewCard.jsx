import { useState } from "react";
import StarRating from "./StarRating";

const GameReviewCard = ({ foto, usuario, desc, puntuacion, fecha }) => {

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

  const userImageStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  };

  const contentStyle = {
    flex: 1,
    minWidth: 0,
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.5rem",
  };

  const userNameStyle = {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#ffffff",
    margin: 0,
    fontFamily: "'Upheaval', system-ui",
  };


  const dateStyle = {
    fontSize: "0.85rem",
    color: "#9ca3af",
    flexShrink: 0,
    minWidth: "100px",
    textAlign: "right",
  };

  const wrapperStyle = {
    display: "flex",
    gap: "1.5rem",
    width: "100%",
    alignItems: "center",
  };

  return (
    <div style={cardStyle}>
      <img src={foto} alt={usuario} style={userImageStyle} />
      <div style={contentStyle}>
        <div style={headerStyle}>
          <h3 style={userNameStyle}>{usuario}</h3>
          <StarRating rating={puntuacion} />
        </div>
        <p
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          onClick={toggleExpanded}
          onKeyDown={onKeyDownToggle}
          style={descStyle}
        >
          {desc}
        </p>
      </div>
      <span style={dateStyle}>{fecha}</span>
    </div>
  );
};

export default GameReviewCard;
