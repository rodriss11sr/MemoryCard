import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

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
    <header
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "#2d333e",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <h1
          onClick={() => navigate("/")}
          style={{ margin: 0, fontSize: "24px", cursor: "pointer" }}
        >
          GameBoxd 🎮
        </h1>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          padding: "0 20px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Buscar juego..."
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #4b5563",
            color: "#828282",
            padding: "8px 20px",
            borderRadius: "10px",
            width: "100%",
            maxWidth: "500px",
            outline: "none",
            fontSize: "0.95rem",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#0466c8")}
          onBlur={(e) => (e.target.style.borderColor = "#4b5563")}
        />
      </div>

      <div>
        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            background: "#fff",
            border: "2px solid #ffffff",
            overflow: "hidden",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => navigate("/profile")}
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gordon"
            alt="avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      {/*
      <div>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          🔔
        </span>
      </div>
*/}
    </header>
  );
}
export default Header;
