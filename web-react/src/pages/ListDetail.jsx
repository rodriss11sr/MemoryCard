import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameLibraryCard from "../components/GameLibraryCard.jsx";

const API_BASE_URL = '/api';

function ListDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lista, setLista] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/listas/${id}`);
        const data = await res.json();

        if (data.ok) {
          setLista(data.lista);
        } else {
          console.error("Error cargando lista:", data.message);
        }
      } catch (error) {
        console.error("Error cargando datos de la lista:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#ffffff" }}>
        <p>Cargando lista...</p>
      </div>
    );
  }

  if (!lista) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#ffffff" }}>
        <p>Lista no encontrada</p>
        <button
          onClick={() => navigate("/profile")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#29CDF2",
            border: "none",
            borderRadius: "8px",
            color: "#000000",
            cursor: "pointer",
            fontFamily: "upheaval, system-ui",
            fontWeight: "bold",
          }}
        >
          Volver al Perfil
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header de la lista */}
      <div style={{ marginBottom: "30px" }}>
        <button
          onClick={() => navigate("/profile")}
          style={{
            marginBottom: "20px",
            padding: "8px 16px",
            background: "#2b303b",
            border: "1px solid #3e4451",
            borderRadius: "8px",
            color: "#ffffff",
            cursor: "pointer",
            fontFamily: "upheaval, system-ui",
          }}
        >
          ← Volver
        </button>

        <h1 style={{ color: "#ffffff", fontSize: "2rem", marginBottom: "10px" }}>
          {lista.nombre}
        </h1>

        {lista.descripcion && (
          <p style={{ color: "#9ca3af", marginBottom: "15px" }}>{lista.descripcion}</p>
        )}

        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {lista.autor.avatar && (
              <img
                src={lista.autor.avatar}
                alt={lista.autor.nombre}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            )}
            <span style={{ color: "#9ca3af" }}>
              Por <span style={{ color: "#29CDF2" }}>{lista.autor.nombre}</span>
            </span>
          </div>
          {lista.fecha_creacion && (
            <span style={{ color: "#9ca3af" }}>• {lista.fecha_creacion}</span>
          )}
          <span style={{ color: "#9ca3af" }}>
            • {lista.juegos.length} {lista.juegos.length === 1 ? "juego" : "juegos"}
          </span>
        </div>
      </div>

      {/* Lista de juegos */}
      {lista.juegos.length === 0 ? (
        <p style={{ color: "#9ca3af", textAlign: "center", padding: "40px" }}>
          Esta lista está vacía
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "20px",
            padding: "10px 0",
          }}
        >
          {lista.juegos.map((juego) => (
            <div
              key={juego.id}
              onClick={() => navigate(`/game/${juego.id}`)}
              style={{ cursor: "pointer" }}
            >
              <GameLibraryCard
                titulo={juego.nombre}
                portada={juego.imagen}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListDetail;
