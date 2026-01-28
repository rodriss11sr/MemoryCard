import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSamePassword = password === confirmPassword;

  //TODO: Implementar la logica del backend para crear cuentas
  const handleSignin = (e) => {
    e.preventDefault();
    console.log("Registrando con:", email, password);
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
        <h2 style={{ marginBottom: "5px" }}>CREADOR DE PERSONAJE</h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "30px",
            fontSize: "0.9rem",
          }}
        >
          Eh, tú, al fin has despertado
        </p>
      </div>

      <form onSubmit={handleSignin}>
        <div style={{ textAlign: "left" }}>
          <label
            style={{
              fontSize: "0.8rem",
              marginLeft: "5px",
              color: "var(--text-secondary)",
            }}
          >
            Nombre de Usuario
          </label>
          <input
            type="username"
            placeholder="Ej: Gordon Freeman"
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        </div>
        <div style={{ textAlign: "left", marginTop: "10px" }}>
          <label
            style={{
              fontSize: "0.8rem",
              marginLeft: "5px",
              color: "var(--text-secondary)",
            }}
          >
            Confirmar contraseña
          </label>
          <input
            type="password"
            placeholder="••••••"
            style={inputStyle}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        // TODO: Cambiar a "submit" cuando este implementada la logica de creacion en el backend
        <button
          type="button"
          onClick={handleSignin}
          style={buttonStyle}
          disabled={!isSamePassword}
          onMouseOver={(e) => (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          Crear
        </button>
      </form>

      <p
        style={{
          marginTop: "20px",
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
        }}
      >
        ¿Ya tienes cuenta?{" "}
        <span
          style={{ color: "#29CDF2", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Inicia Sesión!
        </span>
      </p>
    </div>
  );
}

export default Signin;
