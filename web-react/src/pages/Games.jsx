import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameLibraryCard from "../components/GameLibraryCard.jsx";

const API_BASE_URL = '/api';

function Games() {
  const navigate = useNavigate();
  const [juegos, setJuegos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const juegosRes = await fetch(`${API_BASE_URL}/juegos`);
        const juegosData = await juegosRes.json();

        if (Array.isArray(juegosData)) {
          setJuegos(juegosData);
        }
      } catch (error) {
        console.error("Error cargando juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#ffffff" }}>
        <p>Cargando juegos...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#ffffff", marginBottom: "20px" }}>Todos los Juegos</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "20px",
          padding: "10px 0",
        }}
      >
        {juegos.map((juego) => (
          <div
            key={juego.id}
            onClick={() => navigate(`/game/${juego.id}`)}
            style={{ cursor: "pointer" }}
          >
            <GameLibraryCard
              titulo={juego.titulo}
              portada={juego.imagen}
              puntuacion={juego.rating}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
