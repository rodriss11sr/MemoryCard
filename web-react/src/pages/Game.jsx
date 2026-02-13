import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../components/StarRating";
import GameLibraryCard from "../components/GameLibraryCard";
import GameReviewCard from "../components/GameReviewCard";

const API_BASE_URL = '/api';

function Game() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gameRes, reviewsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/juegos/${id}`),
          fetch(`${API_BASE_URL}/resenas?id_juego=${id}`),
        ]);

        const gameData = await gameRes.json();
        const reviewsData = await reviewsRes.json();

        if (!gameRes.ok || gameData.error) {
          console.error("Error cargando juego:", gameData.error || gameData);
        } else {
          setGame(gameData);
        }

        console.log("Reseñas cargadas inicialmente:", reviewsData);
        if (Array.isArray(reviewsData)) {
          setReviews(reviewsData);
        } else if (reviewsData.error) {
          console.error("Error al cargar reseñas:", reviewsData.error);
        }
      } catch (error) {
        console.error("Error cargando datos del juego:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Obtener usuario del localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Añadir juego a wishlist
  const handleAddToWishlist = async () => {
    if (!user) {
      setMessage({ type: "error", text: "Debes estar logeado" });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/usuarios/${user.id}/juegos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_juego: parseInt(id),
          estado: "pendiente",
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setMessage({ type: "success", text: "Añadido a wishlist" });
      } else {
        setMessage({ type: "error", text: data.message || "Error" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error al añadir a wishlist" });
    }
  };

  // Añadir juego a biblioteca
  const handleAddToLibrary = async (estado) => {
    if (!user) {
      setMessage({ type: "error", text: "Debes estar logeado" });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/usuarios/${user.id}/juegos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_juego: parseInt(id),
          estado: estado,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setMessage({ type: "success", text: `Añadido como "${estado}"` });
      } else {
        setMessage({ type: "error", text: data.message || "Error" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error al añadir juego" });
    }
  };

  // Crear reseña
  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage({ type: "error", text: "Debes estar logeado" });
      return;
    }

    if (reviewText.trim() === "") {
      setMessage({ type: "error", text: "Escribe algo en la reseña" });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/resenas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: user.id,
          id_juego: parseInt(id),
          texto: reviewText,
          nota: reviewRating > 0 ? reviewRating * 2 : null, // Convertir de 0-5 a 0-10
          spoilers: false,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setMessage({ type: "success", text: "Reseña creada" });
        setShowReviewForm(false);
        setReviewText("");
        setReviewRating(0);
        // Esperar un momento para que la base de datos se actualice
        await new Promise(resolve => setTimeout(resolve, 500));
        // Recargar reseñas
        const reviewsRes = await fetch(`${API_BASE_URL}/resenas?id_juego=${id}`);
        const reviewsData = await reviewsRes.json();
        console.log("Reseñas recargadas:", reviewsData);
        if (Array.isArray(reviewsData)) {
          setReviews(reviewsData);
        } else if (reviewsData.error) {
          console.error("Error al recargar reseñas:", reviewsData.error);
          setMessage({ type: "error", text: "Error al recargar reseñas: " + reviewsData.error });
        } else {
          console.error("Formato inesperado de reseñas:", reviewsData);
        }
      } else {
        setMessage({ type: "error", text: data.message || "Error" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error al crear reseña" });
    }
  };

  // Juegos relacionados
  const RELACIONADOS_DATA = [
    {
      id: 51,
      nombre: "Assassin's Creed: Bloodlines",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xia.webp",
    },
    {
      id: 52,
      nombre: "Assassin's Creed II",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rcf.webp",
    },
    {
      id: 53,
      nombre: "Assassin's Creed Brotherhood",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co6t4d.webp",
    },
    {
      id: 54,
      nombre: "Assassin's Creed Revelations",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xih.webp",
    },
    {
      id: 55,
      nombre: "Assassin's Creed III",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xii.webp",
    },
    {
      id: 56,
      nombre: "Assassin's Creed IV Black Flag",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co4qfn.webp",
    },
    {
      id: 57,
      nombre: "Assassin's Creed Unity",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xiq.webp",
    },
    {
      id: 58,
      nombre: "Assassin's Creed Rogue",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xir.webp",
    },
    {
      id: 59,
      nombre: "Assassin's Creed Mirage",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co57sj.webp",
    },
  ];

  if (loading) {
    return (
      <div className="game-page" style={{ textAlign: "center", padding: "2rem", color: "#ffffff", backgroundColor: "#111827", minHeight: "100vh" }}>
        <p>Cargando juego...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="game-page" style={{ textAlign: "center", padding: "2rem", color: "#ffffff", backgroundColor: "#111827", minHeight: "100vh" }}>
        <p>No se ha encontrado el juego.</p>
      </div>
    );
  }

  return (
    <div className="game-page" style={{ backgroundColor: "#111827", minHeight: "100vh", padding: "20px" }}>
      {/* Título del juego */}
      <h1 className="game-title" style={{ textAlign: "center", color: "#ffffff" }}>
        {game.titulo}
      </h1>

      {/* Sección principal del juego */}
      <div
        style={{ textAlign: "center", marginBottom: "30px", marginTop: "10px" }}
      >
        <aside
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
            margin: "0 auto",
            width: "fit-content",
            maxWidth: "1200px",
          }}
        >
          <div className="game-cover">
            <img
              style={{ 
                objectFit: "cover", 
                borderRadius: "12px",
                width: "300px",
                height: "450px"
              }}
              src={game.imagen}
              alt={game.titulo}
            />
          </div>

          <div className="game-info">
            <p className="game-description" style={{ maxWidth: "600px", color: "#e5e7eb" }}>
              {game.descripcion}
            </p>
          </div>
          <div className="game-details">
            <div className="detail-row">
              <span className="label" style={{ color: "#9ca3af" }}>Fecha de lanzamiento: </span>
              <span className="value" style={{ color: "#29CDF2" }}>
                {game.fecha}
              </span>
            </div>
            <div className="detail-row">
              <span className="label" style={{ color: "#9ca3af" }}>Plataformas: </span>
              <span className="value" style={{ color: "#29CDF2" }}>
                {Array.isArray(game.plataforma)
                  ? game.plataforma.join(", ")
                  : game.plataforma}
              </span>
            </div>

            <div className="detail-row">
              <span className="label" style={{ color: "#9ca3af" }}>Desarrollador: </span>
              <span className="value" style={{ color: "#29CDF2" }}>
                {game.desarrollador}
              </span>
            </div>

            <div className="detail-row">
              <span className="label" style={{ color: "#9ca3af" }}>Género: </span>
              <span className="value" style={{ color: "#29CDF2" }}>
                {game.genero}
              </span>
            </div>
          </div>
        </aside>
      </div>
      {/* Botones de acción */}
      {user && (
        <div style={{ textAlign: "center", marginBottom: "30px", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={handleAddToWishlist}
            style={{
              padding: "10px 20px",
              background: "#2b303b",
              border: "1px solid #3e4451",
              borderRadius: "8px",
              color: "#ffffff",
              cursor: "pointer",
              fontFamily: "upheaval, system-ui",
            }}
          >
            Añadir a Wishlist
          </button>
          <button
            onClick={() => handleAddToLibrary("jugando")}
            style={{
              padding: "10px 20px",
              background: "#2b303b",
              border: "1px solid #3e4451",
              borderRadius: "8px",
              color: "#ffffff",
              cursor: "pointer",
              fontFamily: "upheaval, system-ui",
            }}
          >
            Estoy Jugando
          </button>
          <button
            onClick={() => handleAddToLibrary("completado")}
            style={{
              padding: "10px 20px",
              background: "#2b303b",
              border: "1px solid #3e4451",
              borderRadius: "8px",
              color: "#ffffff",
              cursor: "pointer",
              fontFamily: "upheaval, system-ui",
            }}
          >
            Completado
          </button>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            style={{
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
            {showReviewForm ? "Cancelar Reseña" : "Escribir Reseña"}
          </button>
        </div>
      )}

      {message && (
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: message.type === "success" ? "#10b981" : "#ef4444",
            color: "#ffffff",
            borderRadius: "8px",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Formulario de reseña */}
      {showReviewForm && user && (
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto 30px auto",
            padding: "20px",
            backgroundColor: "#2b303b",
            borderRadius: "12px",
            border: "1px solid #3e4451",
          }}
        >
          <h3 style={{ color: "#ffffff", marginBottom: "15px" }}>Escribir Reseña</h3>
          <form onSubmit={handleCreateReview}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
                Puntuación (opcional)
              </label>
              <StarRating
                nota={reviewRating}
                onRatingChange={setReviewRating}
                editable={true}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ color: "#9ca3af", display: "block", marginBottom: "5px" }}>
                Reseña
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Escribe tu reseña aquí..."
                style={{
                  width: "100%",
                  minHeight: "100px",
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  color: "#333",
                  fontFamily: "m6x11plus, system-ui",
                  boxSizing: "border-box",
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
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
              Publicar Reseña
            </button>
          </form>
        </div>
      )}

      <div className="game-header"></div>

      {/* Sección de juegos relacionados */}
      <section className="related-games-section">
        <h2 className="section-title" style={{ color: "#ffffff" }}>Juegos Relacionados</h2>
        <div
          className="games-row"
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
            overflowX: "auto",
            overflowY: "hidden",
            padding: "10px 0",
            WebkitOverflowScrolling: "touch",
            justifyContent: "left",
            scrollSnapType: "x mandatory",
          }}
        >
          {RELACIONADOS_DATA.map((juego) => (
            <div
              key={juego.id}
              style={{ flex: "0 0 auto", scrollSnapAlign: "start" }}
            >
              <GameLibraryCard
                key={juego.id}
                nombre={juego.nombre}
                portada={juego.imagen}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Sección de reseñas */}
      <section className="reviews-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 className="section-title" style={{ color: "#ffffff", margin: 0 }}>Reseñas</h2>
          <button
            onClick={async () => {
              try {
                const reviewsRes = await fetch(`${API_BASE_URL}/resenas?id_juego=${id}`);
                const reviewsData = await reviewsRes.json();
                console.log("Reseñas recargadas manualmente:", reviewsData);
                if (Array.isArray(reviewsData)) {
                  setReviews(reviewsData);
                }
              } catch (error) {
                console.error("Error al recargar reseñas:", error);
              }
            }}
            style={{
              padding: "8px 16px",
              background: "#2b303b",
              border: "1px solid #3e4451",
              borderRadius: "8px",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            🔄 Recargar
          </button>
        </div>
        <div
          className="reviews-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {reviews.length === 0 ? (
            <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px" }}>
              No hay reseñas todavía. ¡Sé el primero en escribir una!
            </p>
          ) : (
            reviews.map((review) => (
              <GameReviewCard
                key={review.id}
                foto={review.avatar || "https://via.placeholder.com/50"}
                usuario={review.usuario || "Usuario anónimo"}
                desc={review.contenido || ""}
                puntuacion={review.puntuacion}
                fecha={review.fecha || ""}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default Game;
