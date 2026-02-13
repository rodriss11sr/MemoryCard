import StarRating from "./StarRating";

const GameReviewCard = ({ foto, usuario, desc, puntuacion, fecha }) => {
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

  const descriptionStyle = {
    fontSize: "0.85rem",
    color: "#9ca3af",
    margin: "0.5rem 0 0 0",
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
        <p style={descriptionStyle}>{desc}</p>
      </div>
      <span style={dateStyle}>{fecha}</span>
    </div>
  );
};

export default GameReviewCard;
