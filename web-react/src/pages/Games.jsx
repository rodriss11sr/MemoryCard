import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameLibraryCard from "../components/GameLibraryCard.jsx";
import { API_BASE_URL } from "../config/api";

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

        // Helper: parsear fechas en formatos comunes (dd/mm/yy, dd/mm/yyyy, ISO)
        const parseFecha = (f) => {
          if (!f) return new Date(0);
          if (f instanceof Date) return f;
          if (typeof f !== 'string') return new Date(f);
          // formato dd/mm/yyyy o dd/mm/yy
          if (f.includes('/')) {
            const parts = f.split('/').map(s => parseInt(s, 10));
            if (parts.length >= 3) {
              let [d, m, y] = parts;
              if (y < 100) y += y < 50 ? 2000 : 1900;
              return new Date(y, m - 1, d);
            }
          }
          // intentar parseo ISO u otros
          const dt = new Date(f);
          if (!isNaN(dt)) return dt;
          return new Date(0);
        };

        const sortByFechaDesc = (arr) => {
          return arr.slice().sort((a, b) => parseFecha(b.fecha) - parseFecha(a.fecha));
        };

        if (Array.isArray(data)) {
          // Compatibilidad: endpoint antiguo devolvía array
          setJuegos(sortByFechaDesc(data));
          setTotalPages(null);
        } else if (data && Array.isArray(data.juegos)) {
          setJuegos(sortByFechaDesc(data.juegos));
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
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setPage(1)} disabled={page === 1}>Primera</button>
          <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Anterior</button>

          {/* Ventana de páginas: mostrar hasta 5 antes y 5 después */}
          {(() => {
            const delta = 5;
            const start = Math.max(1, page - delta);
            const end = Math.min(totalPages, page + delta);
            const items = [];

            if (start > 1) {
              // Mostrar primer número y posible ellipsis
              items.push(
                <button key={1} onClick={() => setPage(1)} style={{ fontWeight: page === 1 ? 'bold' : 'normal' }}>1</button>
              );
              if (start > 2) items.push(<span key="start-ellipsis">…</span>);
            }

            for (let p = start; p <= end; p++) {
              items.push(
                <button key={p} onClick={() => setPage(p)} style={{ fontWeight: page === p ? 'bold' : 'normal' }}>{p}</button>
              );
            }

            if (end < totalPages) {
              if (end < totalPages - 1) items.push(<span key="end-ellipsis">…</span>);
              items.push(
                <button key={totalPages} onClick={() => setPage(totalPages)} style={{ fontWeight: page === totalPages ? 'bold' : 'normal' }}>{totalPages}</button>
              );
            }

            return items;
          })()}

          <button disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Siguiente</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}>Última</button>
        </div>
      )}
    </div>
  );
}

export default Games;
