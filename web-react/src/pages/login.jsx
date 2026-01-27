import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica real de backend.
    // Por ahora simulamos que entra y redirige al Home.
    console.log("Logueando con:", email, password);
    navigate("/");
  };

  // Estilos
  const containerStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--bg-color)", // Fondo oscuro global
    color: "var(--text-primary)",
  };

  const cardStyle = {
    backgroundColor: "var(--card-bg)", // Azul grisáceo de tus tarjetas
    padding: "40px",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    textAlign: "center",
    border: "1px solid var(--border-color)",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    fontSize: "1rem",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#0466c8",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "opacity 0.2s",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo o Icono */}
        <h2 style={{ marginBottom: "5px" }}>BIENVENID@!</h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "30px",
            fontSize: "0.9rem",
          }}
        >
          Nos alegra verte de nuevo!! :)
        </p>

        <form onSubmit={handleLogin}>
          <div style={{ textAlign: "left" }}>
            <label
              style={{
                fontSize: "0.8rem",
                marginLeft: "5px",
                color: "var(--text-secondary)",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="email@domain.com"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: "left", marginTop: "10px" }}>
            <label
              style={{
                fontSize: "0.8rem",
                marginLeft: "5px",
                color: "var(--text-secondary)",
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="button" // Cambia a "submit" cuando tengas backend real
            onClick={handleLogin}
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.opacity = "0.9")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Entrar
          </button>
        </form>

        <p
          style={{
            marginTop: "20px",
            fontSize: "0.8rem",
            color: "var(--text-secondary)",
          }}
        >
          ¿No tienes cuenta?{" "}
          <span style={{ color: "#29CDF2", cursor: "pointer" }}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
