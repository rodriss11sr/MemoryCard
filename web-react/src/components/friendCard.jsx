

const FriendCard = ({ nombre, juegos }) => {
  const cardStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    backgroundColor: "#2b303b",
    padding: "15px 20px",
    borderRadius: "12px",
    border: "1px solid #3e4451",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    marginBottom: "10px",
    transition: "transform 0.2s ease, background-color 0.2s",
    cursor: "pointer",
  };

  const avatarContainerStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    border: "2px solid #ffffff",
    flexShrink: 0,
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.backgroundColor = "#323844";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.backgroundColor = "#2b303b";
      }}
    >
      <div style={avatarContainerStyle}>
        <img
          src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${nombre}`}
          alt={nombre}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            color: "#ffffff",
            fontWeight: "800",
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontFamily: "upheaval, system-ui",
          }}
        >
          {nombre}
        </span>

        <span
          style={{
            color: "#9ca3af", // Gris claro
            fontSize: "0.9rem",
            marginTop: "2px",
            fontWeight: "500",
          }}
        >
          Juegos: <span style={{ color: "#e0e0e0" }}>{juegos}</span>
        </span>
      </div>
    </div>
  );
};

export default FriendCard;
