import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: "10px",
    height: "80px",
    textDecoration: "none",
    color: "#ffffff",
    fontSize: "14px",
    transition: "all 0.3s",
    flexDirection: "row",
    gap: "20px",
    fontFamily: "'Upheaval', system-ui",
  };

  const getStyle = ({ isActive }) => ({
    ...linkStyle,
    background: isActive ? "#e0e7ff" : "transparent",
    color: isActive ? "#33415c" : "#ffffff",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 64,
        bottom: 0,
        width: "180px",
        backgroundColor: "#33415c",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        paddingTop: "20px",
        zIndex: 40,
        transition: "width 0.3s ease",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <NavLink to="/" style={getStyle}>
          <span style={{ fontSize: "25px" }}>🏠</span>
          <span style={{ fontSize: "25px" }}>Inicio</span>
        </NavLink>

        <NavLink to="/perfil" style={getStyle}>
          <span style={{ fontSize: "25px" }}>👤</span>
          <span style={{ fontSize: "25px" }}>Perfil</span>
        </NavLink>

        <NavLink to="/juegos" style={getStyle}>
          <span style={{ fontSize: "25px" }}>🎮</span>
          <span style={{ fontSize: "25px" }}>Juegos</span>
        </NavLink>

        <NavLink to="/reviews" style={getStyle}>
          <span style={{ fontSize: "25px" }}>📝</span>
          <span style={{ fontSize: "25px" }}>Reviews</span>
        </NavLink>

        <NavLink to="/whishlist" style={getStyle}>
          <span style={{ fontSize: "25px" }}>❤️</span>
          <span style={{ fontSize: "25px" }}>Whishlist</span>
        </NavLink>

        <NavLink to="/amigos" style={getStyle}>
          <span style={{ fontSize: "25px" }}>👥</span>
          <span style={{ fontSize: "25px" }}>Amigos</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
