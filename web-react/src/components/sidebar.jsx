import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarWidth }) => {
  const linkStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50px",
    textDecoration: "none",
    color: "#ffffff",
    fontSize: "14px",
    transition: "background 0.3s",
    flexDirection: "column",
  };

  const getStyle = ({ isActive }) => ({
    ...linkStyle,
    background: isActive ? "#e0e7ff" : "transparent",
    color: isActive ? "#4f46e5" : "#ffffff",
    fontWeight: isActive ? "bold" : "normal",
    borderLeft: isActive ? "4px solid #4f46e5" : "4px solid transparent",
  });

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: 64,
        bottom: 0,
        width: sidebarWidth,
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
          <span>🏠</span>
          <span style={{ fontSize: "10px" }}>Inicio</span>
        </NavLink>

        <NavLink to="/perfil" style={getStyle}>
          <span>👤</span>
          <span style={{ fontSize: "10px" }}>Perfil</span>
        </NavLink>

        <NavLink to="/juegos" style={getStyle}>
          <span>🎮</span>
          <span style={{ fontSize: "10px" }}>Juegos</span>
        </NavLink>

        <NavLink to="/reviews" style={getStyle}>
          <span>[]</span>
          <span style={{ fontSize: "10px" }}>Reviews</span>
        </NavLink>

        <NavLink to="/whishlist" style={getStyle}>
          <span>[]</span>
          <span style={{ fontSize: "10px" }}>Whishlist</span>
        </NavLink>

        <NavLink to="/amigos" style={getStyle}>
          <span>👤</span>
          <span style={{ fontSize: "10px" }}>Amigos</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
