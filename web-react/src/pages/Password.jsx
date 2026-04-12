import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Password() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.message || "Error al procesar la solicitud");
        return;
      }

      setSuccess("Si el correo existe, recibirás instrucciones para recuperar tu contraseña. Revisa la consola del backend para ver el enlace.");
    } catch (err) {
      setError("No se pudo conectar con el servidor. Comprueba que esté encendido e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  // Estilos
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#111827",
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
        <h2 style={{ marginBottom: "5px" }}>Recuperar contraseña</h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "30px",
            fontFamily: "m6x11plus",
            fontSize: "1rem",
          }}
        >
          Ingresa el email y te enviaremos instrucciones para recuperar la cuenta
        </p>
        {error && (
          <p style={{ color: "#ff6b6b", fontFamily: "m6x11plus", fontSize: "0.9rem" }}>
            {error}
          </p>
        )}
        {success && (
          <p style={{ color: "#29CDF2", fontFamily: "m6x11plus", fontSize: "0.9rem" }}>
            {success}
          </p>
        )}
      </div>
      <form onSubmit={handlePassword}>
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
            type="email"
            placeholder="email@domain.com"
            style={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={{ ...buttonStyle, opacity: loading ? 0.6 : 1 }}
          disabled={loading}
          onMouseOver={(e) => (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          {loading ? "Enviando..." : "Recuperar"}
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
          Inicia Sesión
        </span>
      </p>
    </div>
  );
}

export default Password;
