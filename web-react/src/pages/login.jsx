import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.message || "No se pudo iniciar sesión");
        return;
      }

      // Guardar usuario en localStorage para mantener la sesión
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
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
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "5px" }}>BIENVENID@!</h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "30px",
            fontFamily: "m6x11plus",
            fontSize: "1rem",
          }}
        >
          Nos alegra verte de nuevo!! :)
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
      </div>

      <form onSubmit={handleLogin}>
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
          <p
            style={{
              marginTop: "1px",
              fontFamily: "m6x11plus",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              textAlign: "right",
              width: "100%",
            }}
          >
            <span
              style={{ color: "#29CDF2", cursor: "pointer", }}
              onClick={() => navigate("/password")}
            >
              Olvidé la contraseña
            </span>
          </p>
        </div>
        <button
          type="submit"
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
          fontFamily: "m6x11plus",
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
