import { useState, useEffect } from "react";
import "../App.css";

const API_URL = "http://localhost:3000/api";

function Home() {
  const [likes, setLikes] = useState(0);
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarJuegos() {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/juegos`);
        if (!response.ok) {
          throw new Error("Error al cargar los juegos");
        }
        const data = await response.json();
        setJuegos(data);
        setError(null);
      } catch (err) {
        console.error("Error:", err);
        setError("No se pudo conectar con el servidor. ¿Está el backend corriendo?");
      } finally {
        setLoading(false);
      }
    }
    cargarJuegos();
  }, []);

  return (
    <div className="home-container">
      <div style={{ 
          marginBottom: "30px", 
          paddingBottom: "20px", 
          borderBottom: "1px solid #eee" 
      }}>
        <h2 style={{ fontSize: "2rem", margin: "0 0 10px 0" }}>Bienvenido a tu Diario 🎮</h2>
        <p style={{ color: "#666" }}>Explora y gestiona tu colección de videojuegos personal.</p>
      </div>

      <div className="card" style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Busca un juego para loguear..."
          style={{
            padding: "12px 20px",
            borderRadius: "25px",
            border: "1px solid #ddd",
            width: "100%",
            maxWidth: "500px",
            fontSize: "1rem"
          }}
        />
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <p>⏳ Cargando biblioteca...</p>
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            padding: "15px",
            borderRadius: "10px",
            margin: "20px 0",
            textAlign: "center",
            border: "1px solid #fca5a5"
          }}
        >
          <p>⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {juegos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#888", width: "100%" }}>
              <p>📭 No hay juegos disponibles.</p>
              <small>Agrega algunos desde el backend para empezar.</small>
            </div>
          ) : (
            juegos.map((juego) => (
              <div
                key={juego.id_juego}
                style={{
                  backgroundColor: "#fff",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                  width: "200px",
                  textAlign: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s"
                }}
              >
                {juego.portada ? (
                  <img
                    src={juego.portada}
                    alt={juego.titulo}
                    style={{
                      width: "100%",
                      aspectRatio: "3/4",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div style={{ 
                      height: "200px", 
                      background: "#f3f4f6", 
                      borderRadius: "8px", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      marginBottom: "10px",
                      fontSize: "40px"
                  }}>
                    🎮
                  </div>
                )}
                <h4 style={{ margin: "10px 0", fontSize: "0.95rem", color: "#111" }}>
                  {juego.titulo}
                </h4>
                {juego.plataformas && (
                  <span
                    style={{
                      display: "inline-block",
                      background: "#f3f4f6",
                      padding: "2px 8px",
                      borderRadius: "10px",
                      fontSize: "0.7rem",
                      color: "#555"
                    }}
                  >
                    {juego.plataformas.split(", ").slice(0, 1).join("")}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <div className="card" style={{ marginTop: "60px", textAlign: "center", padding: "20px", background: "#f9fafb", borderRadius: "10px" }}>
        <button 
            onClick={() => setLikes((likes) => likes + 1)}
            style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "20px",
                cursor: "pointer",
                fontWeight: "bold"
            }}
        >
          ❤️ Me gusta el proyecto ({likes})
        </button>
      </div>
      
      <footer style={{ marginTop: "30px", opacity: 0.6, textAlign: "center", fontSize: "0.8rem" }}>
        TFG - Equipo GameBoxd - 2025
      </footer>
    </div>
  );
}

export default Home;