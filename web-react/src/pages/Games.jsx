import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameLibraryCard from "../components/GameLibraryCard.jsx";

const API_BASE_URL = '/api';

function Games() {
  const navigate = useNavigate();
  const [juegos, setJuegos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const perPage = 90;
        const res = await fetch(`${API_BASE_URL}/juegos?page=${page}&limit=${perPage}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          // Compatibilidad: endpoint antiguo devolvía array
          setJuegos(data);
          setTotalPages(null);
        } else if (data && Array.isArray(data.juegos)) {
          setJuegos(data.juegos);
          setTotalPages(data.totalPages || null);
        }
      } catch (error) {
        console.error("Error cargando juegos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

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
      {totalPages && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
          <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Anterior</button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{ fontWeight: page === i + 1 ? 'bold' : 'normal' }}
            >{i + 1}</button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Siguiente</button>
        </div>
      )}
    </div>
  );
}

export default Games;
