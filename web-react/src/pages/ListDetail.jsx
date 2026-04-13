import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameLibraryCard from "../components/GameLibraryCard.jsx";
import { API_BASE_URL } from "../config/api";

function ListDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lista, setLista] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estados para añadir juego
  const [showAddGame, setShowAddGame] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [addMessage, setAddMessage] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isOwner = user && lista && lista.autor && user.id === lista.autor.id;

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

  useEffect(() => {
    fetchData();
  }, [id]);

  // Buscar juegos con debounce
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`${API_BASE_URL}/juegos/buscar?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setSearchResults(data);
        }
      } catch (error) {
        console.error("Error buscando juegos:", error);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleAddGame = async (juego) => {
    setAddMessage(null);
    try {
      const res = await fetch(`${API_BASE_URL}/listas/${id}/juegos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_juego: juego.id }),
      });

      const data = await res.json();
      if (data.ok) {
        setAddMessage({ type: "success", text: `"${juego.nombre || juego.titulo}" añadido a la lista` });
        setSearchQuery("");
        setSearchResults([]);
        // Recargar la lista para mostrar el juego nuevo
        await fetchData();
      } else {
        setAddMessage({ type: "error", text: data.message || "Error al añadir" });
      }
    } catch (error) {
      setAddMessage({ type: "error", text: "Error de conexión" });
    }
  };

  const handleRemoveGame = async (idJuego, nombreJuego) => {
    if (!window.confirm(`¿Eliminar "${nombreJuego}" de la lista?`)) return;

    try {
      const res = await fetch(`${API_BASE_URL}/listas/${id}/juegos/${idJuego}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.ok) {
        setAddMessage({ type: "success", text: `"${nombreJuego}" eliminado de la lista` });
        await fetchData();
      } else {
        setAddMessage({ type: "error", text: data.message || "Error al eliminar" });
      }
    } catch (error) {
      setAddMessage({ type: "error", text: "Error de conexión" });
    }
  };

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

  // Ids de juegos ya en la lista
  const idsEnLista = lista.juegos.map((j) => j.id);

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

        <div style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px", flexWrap: "wrap" }}>
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

          {/* Botón Añadir juego (solo dueño) */}
          {isOwner && (
            <button
              onClick={() => setShowAddGame(!showAddGame)}
              style={{
                padding: "8px 16px",
                background: showAddGame ? "#ef4444" : "#29CDF2",
                border: "none",
                borderRadius: "8px",
                color: showAddGame ? "#ffffff" : "#000000",
                cursor: "pointer",
                fontFamily: "upheaval, system-ui",
                fontWeight: "bold",
                fontSize: "0.9rem",
                transition: "background 0.2s",
              }}
            >
              {showAddGame ? "✕ Cerrar" : "＋ Añadir juego"}
            </button>
          )}
        </div>
      </div>

      {/* Mensaje de feedback */}
      {addMessage && (
        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: addMessage.type === "success" ? "#10b981" : "#ef4444",
            color: "#ffffff",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "0.9rem",
          }}
        >
          {addMessage.text}
        </div>
      )}

      {/* Panel de búsqueda para añadir juego */}
      {showAddGame && isOwner && (
        <div
          style={{
            backgroundColor: "#2b303b",
            border: "1px solid #3e4451",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "30px",
          }}
        >
          <h3 style={{ color: "#ffffff", marginTop: 0, marginBottom: "15px" }}>
            Buscar juego para añadir
          </h3>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Escribe el nombre del juego..."
            style={{
              width: "100%",
              padding: "12px 15px",
              backgroundColor: "#ffffff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              color: "#333",
              fontSize: "1rem",
              boxSizing: "border-box",
              marginBottom: "15px",
            }}
          />

          {searching && (
            <p style={{ color: "#9ca3af", textAlign: "center" }}>Buscando...</p>
          )}

          {searchResults.length > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {searchResults.map((juego) => {
                const yaEnLista = idsEnLista.includes(juego.id);

                return (
                  <div
                    key={juego.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px",
                      backgroundColor: "#1f2937",
                      borderRadius: "8px",
                      border: yaEnLista ? "1px solid #10b981" : "1px solid #3e4451",
                    }}
                  >
                    {juego.imagen && (
                      <img
                        src={juego.imagen}
                        alt={juego.nombre || juego.titulo}
                        style={{
                          width: "50px",
                          height: "65px",
                          borderRadius: "6px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <span style={{ color: "#ffffff", fontWeight: "bold" }}>
                        {juego.nombre || juego.titulo}
                      </span>
                      {juego.rating && (
                        <span
                          style={{
                            display: "block",
                            color: "#fbbf24",
                            fontSize: "0.85rem",
                          }}
                        >
                          ⭐ {juego.rating}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => !yaEnLista && handleAddGame(juego)}
                      disabled={yaEnLista}
                      style={{
                        padding: "8px 14px",
                        backgroundColor: yaEnLista ? "#1a1f2b" : "#29CDF2",
                        border: "none",
                        borderRadius: "6px",
                        color: yaEnLista ? "#10b981" : "#000000",
                        cursor: yaEnLista ? "default" : "pointer",
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {yaEnLista ? "✓ Ya en lista" : "＋ Añadir"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {searchQuery.length >= 2 && !searching && searchResults.length === 0 && (
            <p style={{ color: "#9ca3af", textAlign: "center" }}>
              No se encontraron juegos para "{searchQuery}"
            </p>
          )}
        </div>
      )}

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
              style={{ cursor: "pointer", position: "relative" }}
            >
              {/* Botón eliminar (solo dueño) */}
              {isOwner && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveGame(juego.id, juego.nombre);
                  }}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    zIndex: 10,
                    background: "rgba(239, 68, 68, 0.9)",
                    border: "none",
                    borderRadius: "50%",
                    color: "#ffffff",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(239, 68, 68, 0.9)")}
                  title="Eliminar de la lista"
                >
                  ✕
                </button>
              )}
              <div onClick={() => navigate(`/game/${juego.id}`)}>
                <GameLibraryCard
                  titulo={juego.nombre}
                  portada={juego.imagen}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListDetail;
