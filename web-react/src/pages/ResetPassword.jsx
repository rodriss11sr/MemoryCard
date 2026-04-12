import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isSamePassword = password === confirmPassword;

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isSamePassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      // Comprobar que la respuesta es JSON (Evita caídas si el proxy devuelve HTML de error)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Respuesta no válida del servidor. ¿Está el backend encendido?");
      }

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.message || "No se pudo cambiar la contraseña");
        return;
      }

      setSuccess("Contraseña actualizada correctamente. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Error de conexión:", err);
      setError(err.message === "Failed to fetch" 
        ? "No se pudo conectar con el servidor. Comprueba que esté encendido." 
        : err.message);
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
        <h2 style={{ marginBottom: "5px" }}>Nueva Contraseña</h2>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "30px",
            fontFamily: "m6x11plus",
            fontSize: "1rem",
          }}
        >
          Ingresa tu nueva contraseña
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
      <form onSubmit={handleReset}>
        <div style={{ textAlign: "left" }}>
          <label
            style={{
              fontSize: "0.8rem",
              marginLeft: "5px",
              color: "var(--text-secondary)",
              fontFamily: "m6x11plus",
            }}
          >
            Nueva Contraseña
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
            Confirmar Contraseña
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
          style={{ ...buttonStyle, opacity: loading || !isSamePassword ? 0.6 : 1 }}
          disabled={loading || !isSamePassword}
          onMouseOver={(e) => (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          {loading ? "Cambiando..." : "Cambiar Contraseña"}
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
        ¿Ya recuerdas tu contraseña?{" "}
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

export default ResetPassword;
