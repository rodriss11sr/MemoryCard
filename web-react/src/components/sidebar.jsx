import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebarWidth }) => {
  // Estilo base para los enlaces
  const linkStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Centrado si es estrecho
    height: "50px",
    textDecoration: "none",
    color: "#333",
    fontSize: "14px",
    transition: "background 0.3s",
    flexDirection: "column", // Icono arriba, texto abajo (opcional)
  };

  // Función para calcular estilo activo vs inactivo
  const getStyle = ({ isActive }) => ({
    ...linkStyle,
    background: isActive ? "#e0e7ff" : "transparent", // Fondo azul claro si está activo
    color: isActive ? "#4f46e5" : "#333", // Texto azul fuerte si está activo
    fontWeight: isActive ? "bold" : "normal",
    borderLeft: isActive ? "4px solid #4f46e5" : "4px solid transparent",
  });

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        // Usamos la altura del header definida en tu layout (64px) para bajar el sidebar
        top: 64,
        bottom: 0,
        width: sidebarWidth,
        backgroundColor: "#f9fafb",
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

        <NavLink to="/perfil/reviews" style={getStyle}>
          <span>[]</span>
          <span style={{ fontSize: "10px" }}>Reviews</span>
        </NavLink>

        <NavLink to="/whishlist" style={getStyle}>
          <span>[]</span>
          <span style={{ fontSize: "10px" }}>Whishlist</span>
        </NavLink>

        <NavLink to="/perfil/amigos" style={getStyle}>
          <span>👤</span>
          <span style={{ fontSize: "10px" }}>Amigos</span>
        </NavLink>

        <NavLink to="/ajustes" style={getStyle}>
          <span>⚙️</span>
          <span style={{ fontSize: "10px" }}>Ajustes</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
