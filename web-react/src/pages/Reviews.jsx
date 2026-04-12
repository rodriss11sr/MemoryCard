import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";
import { API_BASE_URL } from "../config/api";

function Reviews() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const [resenas, setResenas] = useState([]);
  const [tab, setTab] = useState("populares");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likedReviews, setLikedReviews] = useState(() => {
    // Limpiar duplicados al cargar
    const raw = JSON.parse(localStorage.getItem("likedReviews") || "[]");
    const limpio = [...new Set(raw)];
    if (limpio.length !== raw.length) {
      localStorage.setItem("likedReviews", JSON.stringify(limpio));
    }
    return limpio;
  });

  // Función para cargar reseñas del servidor
  const fetchResenas = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/resenas`);
      if (!res.ok) {
        throw new Error("Error al conectar con el servidor");
      }
      const data = await res.json();
      if (Array.isArray(data)) setResenas(data);
    } catch (err) {
      console.error("Error cargando reseñas:", err);
      setError("No se pudieron cargar las reseñas. Comprueba que el servidor esté encendido.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResenas();
  }, []);

  const handleToggleLike = async (id) => {
    const yaLiked = likedReviews.some((rid) => rid === id);
    const endpoint = yaLiked ? "unlike" : "like";

    try {
      const res = await fetch(`${API_BASE_URL}/resenas/${id}/${endpoint}`, {
        method: "PUT",
      });
      if (!res.ok) {
        console.error("Error en respuesta:", res.status);
        return;
      }

      // Actualizar localStorage
      let nuevosLikes;
      if (yaLiked) {
        nuevosLikes = likedReviews.filter((rid) => rid !== id);
      } else {
        nuevosLikes = [...likedReviews, id];
      }
      setLikedReviews(nuevosLikes);
      localStorage.setItem("likedReviews", JSON.stringify(nuevosLikes));

      // Actualizar localmente el contador
      setResenas((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, likes: Math.max((r.likes || 0) + (yaLiked ? -1 : 1), 0) }
            : r
        )
      );
    } catch (error) {
      console.error("Error al toggle like:", error);
    }
  };

  // Una sola lista, diferente orden según la tab
  // Populares: solo las que tienen >= 1 like, ordenadas por likes
  // Recientes: todas, por fecha
  const resenasOrdenadas = (() => {
    if (tab === "populares") {
      return [...resenas]
        .filter((r) => (r.likes || 0) >= 1)
        .sort((a, b) => {
          if ((b.likes || 0) !== (a.likes || 0)) return (b.likes || 0) - (a.likes || 0);
          return 0;
        });
    }
    // Recientes: ya vienen ordenadas por fecha del servidor
    return resenas;
  })();

  if (loading) {
    return (
      <div style={{ backgroundColor: "#1b1f27", minHeight: "100vh", padding: "40px 20px", color: "#fff", textAlign: "center" }}>
        <p>Cargando reseñas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: "#1b1f27", minHeight: "100vh", padding: "60px 20px" }}>
        <div style={{
          backgroundColor: "#2b303b",
          border: "1px solid #ef4444",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "500px",
          margin: "0 auto",
          textAlign: "center",
        }}>
          <p style={{ color: "#ef4444", fontSize: "1.5rem", margin: "0 0 10px 0" }}>⚠️</p>
          <p style={{ color: "#ffffff", fontSize: "1rem", margin: "0 0 8px 0" }}>{error}</p>
          <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 20px 0" }}>
            Puede que el servidor no esté iniciado o haya un problema de conexión.
          </p>
          <button
            onClick={fetchResenas}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#29CDF2",
              color: "#000",
              cursor: "pointer",
              fontFamily: "upheaval, system-ui",
              fontWeight: "bold",
              fontSize: "0.95rem",
            }}
          >
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#1b1f27", minHeight: "100vh", padding: "40px 20px" }}>
      {/* Título */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h1 style={{
          color: "#ffffff",
          fontFamily: "upheaval, system-ui",
          fontSize: "2.2rem",
          margin: 0,
        }}>
          🗣️ Muro de la Comunidad
        </h1>
        <p style={{
          color: "#9ca3af",
          fontSize: "1rem",
          marginTop: "8px",
          fontFamily: "m6x11plus, system-ui",
        }}>
          Descubre lo que opina la comunidad sobre sus juegos favoritos
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "30px",
      }}>
        <button
          onClick={() => setTab("populares")}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontFamily: "upheaval, system-ui",
            fontSize: "0.95rem",
            transition: "all 0.2s ease",
            background: tab === "populares" ? "#29CDF2" : "#2b303b",
            color: tab === "populares" ? "#000" : "#9ca3af",
          }}
        >
          🔥 Populares
        </button>
        <button
          onClick={() => setTab("recientes")}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontFamily: "upheaval, system-ui",
            fontSize: "0.95rem",
            transition: "all 0.2s ease",
            background: tab === "recientes" ? "#29CDF2" : "#2b303b",
            color: tab === "recientes" ? "#000" : "#9ca3af",
          }}
        >
          🕐 Recientes
        </button>
      </div>

      {/* Lista de reseñas */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        maxWidth: "750px",
        margin: "0 auto",
      }}>
        {resenasOrdenadas.length === 0 ? (
          <p style={{ color: "#9ca3af", textAlign: "center", padding: "40px" }}>
            No hay reseñas todavía. ¡Sé el primero en escribir una!
          </p>
        ) : (
          resenasOrdenadas.map((review) => {
            const yaLiked = likedReviews.some((rid) => rid === review.id);

            return (
              <div
                key={review.id}
                style={{
                  backgroundColor: "#2b303b",
                  border: "1px solid #3e4451",
                  borderRadius: "14px",
                  padding: "20px",
                  width: "100%",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Cabecera: usuario + fecha */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                      src={review.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.usuario}`}
                      alt={review.usuario}
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #29CDF2",
                        cursor: review.id_usuario ? 'pointer' : 'default',
                      }}
                      onClick={() => {
                        if (!review.id_usuario) return;
                        if (currentUser && currentUser.id === review.id_usuario) navigate('/profile');
                        else navigate(`/user/${review.id_usuario}`);
                      }}
                    />
                    <div>
                      <p
                        style={{
                          margin: 0,
                          color: "#ffffff",
                          fontFamily: "upheaval, system-ui",
                          fontSize: "0.95rem",
                          cursor: review.id_usuario ? 'pointer' : 'default',
                        }}
                        onClick={() => {
                          if (!review.id_usuario) return;
                          if (currentUser && currentUser.id === review.id_usuario) navigate('/profile');
                          else navigate(`/user/${review.id_usuario}`);
                        }}
                      >
                        {review.usuario || "Usuario anónimo"}
                      </p>
                      <p style={{
                        margin: "2px 0 0 0",
                        color: "#6b7280",
                        fontSize: "0.78rem",
                      }}>
                        {review.fecha}
                      </p>
                    </div>
                  </div>
                  {review.puntuacion !== null && review.puntuacion !== undefined && (
                    <StarRating nota={review.puntuacion / 2} />
                  )}
                </div>

                {/* Juego asociado */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    backgroundColor: "#1f2937",
                    borderRadius: "10px",
                    padding: "12px",
                    marginBottom: "14px",
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                  onClick={() => navigate(`/game/${review.juegoId}`)}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#273040")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1f2937")}
                >
                  {review.imagen && (
                    <img
                      src={review.imagen}
                      alt={review.titulo}
                      style={{
                        width: "45px",
                        height: "65px",
                        borderRadius: "6px",
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div>
                    <p style={{
                      margin: 0,
                      color: "#29CDF2",
                      fontFamily: "upheaval, system-ui",
                      fontSize: "0.9rem",
                    }}>
                      {review.titulo || "Juego desconocido"}
                    </p>
                    <p style={{
                      margin: "3px 0 0 0",
                      color: "#6b7280",
                      fontSize: "0.75rem",
                    }}>
                      Ver página del juego →
                    </p>
                  </div>
                </div>

                {/* Contenido de la reseña */}
                <p style={{
                  color: "#d1d5db",
                  fontSize: "0.92rem",
                  lineHeight: "1.6",
                  margin: "0 0 14px 0",
                  fontFamily: "m6x11plus, system-ui",
                }}>
                  {review.contenido}
                </p>

                {/* Footer: likes */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  borderTop: "1px solid #3e4451",
                  paddingTop: "12px",
                }}>
                  <button
                    onClick={() => handleToggleLike(review.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: yaLiked ? "rgba(239,68,68,0.1)" : "transparent",
                      border: "none",
                      color: yaLiked ? "#ef4444" : "#9ca3af",
                      cursor: "pointer",
                      padding: "5px 10px",
                      borderRadius: "6px",
                      transition: "all 0.15s ease",
                      fontSize: "0.88rem",
                    }}
                    onMouseEnter={(e) => {
                      if (!yaLiked) {
                        e.currentTarget.style.color = "#ef4444";
                        e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!yaLiked) {
                        e.currentTarget.style.color = "#9ca3af";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {yaLiked ? "❤️" : "🤍"} {review.likes || 0}
                  </button>
                  <span style={{ color: "#4b5563", fontSize: "0.8rem" }}>
                    {yaLiked
                      ? "¡Te gustó esta reseña!"
                      : (review.likes || 0) > 0
                        ? `A ${review.likes} persona${review.likes !== 1 ? "s" : ""} les gustó`
                        : "Sé el primero en darle like"
                    }
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Reviews;
