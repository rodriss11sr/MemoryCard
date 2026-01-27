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
    display: "flex",
    justifyContent: "center", // Centra horizontalmente (↔)
    flexDirection: "column", //Pone los elementos verticalmente
    alignItems: "center", // Centra verticalmente (↕)
    height: "100vh",
    width: "100vw",
  };
  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#828282",
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
      {/* Logo o Icono */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
      </div>

      <form onSubmit={handleLogin}>
        <div style={{ textAlign: "left" }}>
          <label
            style={{
              fontSize: "0.8rem",
              marginLeft: "5px",
              color: "var(--text-secondary)",
            }}
          >
            Correo Electrónico
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
          <p
            style={{
              marginTop: "1px",
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              textAlign: "right",
              width: "100%",
            }}
          >
            <span style={{ color: "#29CDF2", cursor: "pointer" }}>
              Olvidé la contraseña
            </span>
          </p>
        </div>

        <button
          type="button" // TODO: Cambiar a "submit" cuando este implementada la logica de creacion y logueo en el backend
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
        <span
          style={{ color: "#29CDF2", cursor: "pointer" }}
          onClick={() => navigate("/signin")}
        >
          Regístrate
        </span>
      </p>
    </div>
  );
}

export default Login;
