import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = '/api';

function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isSamePassword = password === confirmPassword;

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isSamePassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.message || "No se pudo crear la cuenta");
        return;
      }

      setSuccess("Cuenta creada correctamente. Redirigiendo...");

      // Pequeño retraso para que el usuario vea el mensaje y luego lo mandamos al login
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError("Error de red al intentar conectar con el servidor");
    }
  };

  // Estilos
  const containerStyle = {
    display: "flex",
    justifyContent: "center", // Centra horizontalmente (↔)
    flexDirection: "column", //Pone los elementos verticalmente
    alignItems: "center", // Centra verticalmente (↕)
    height: "100vh",
    width: "100vw",
    backgroundColor: "#111827", // fondo oscuro como el resto de la app
    color: "#ffffff",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: "#828282",
    border: "1px solid var(--border-color)",
    fontFamily: "m6x11plus",
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
    fontFamily: "upheaval",
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
            fontFamily: "m6x11plus",
            fontSize: "1rem",
          }}
        >
          Eh, tú, al fin has despertado
        </p>
        {error && (
          <p
            style={{
              color: "#ff6b6b",
              fontFamily: "m6x11plus",
              fontSize: "0.9rem",
            }}
          >
            {error}
          </p>
        )}
        {success && (
          <p
            style={{
              color: "#29CDF2",
              fontFamily: "m6x11plus",
              fontSize: "0.9rem",
            }}
          >
            {success}
          </p>
        )}
      </div>

      <form onSubmit={handleSignin}>
        <div style={{ textAlign: "left" }}>
          <label
            style={{
              fontSize: "0.8rem",
              marginLeft: "5px",
              color: "var(--text-secondary)",
              fontFamily: "m6x11plus",
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
              fontFamily: "m6x11plus",
            }}
          >
            Correo Electrónico
          </label>
          <input
            type="text"
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
              fontFamily: "m6x11plus",
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
              fontFamily: "m6x11plus",
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
        <button
          type="submit"
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
          fontFamily: "m6x11plus",
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
