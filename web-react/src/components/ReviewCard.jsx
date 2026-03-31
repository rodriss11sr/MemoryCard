import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./starRating.jsx";

const API_BASE_URL = "/api";

function ReviewCard({
  id,
  imagen,
  titulo,
  usuario,
  contenido,
  puntuacion,
  avatar,
  fecha,
  gameId,
  id_usuario,
  likes: likesInicial = 0,
}) {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const isOwnReview = currentUser && currentUser.id === id_usuario;

  const [likes, setLikes] = useState(likesInicial);
  const [liked, setLiked] = useState(() => {
    const likedReviews = JSON.parse(localStorage.getItem("likedReviews") || "[]");
    return id && likedReviews.some((rid) => rid === id);
  });

  //Estilo de la tarjeta
  const cardStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "1rem",
    backgroundColor: "#2b303b",
    border: "1px solid #3e4451",
    borderRadius: "12px",
    padding: "1rem",
    width: "100%",
    maxWidth: "700px",
    cursor: "default",
  };

  //Contenido de la reseña
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded((v) => !v);
  const onKeyDownToggle = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpanded();
    }
  };

  const descStyle = {
    color: "#d1d5db",
    fontSize: "1.5 rem",
    margin: "5px 0 0 0",
    marginTop: "2px",
    fontWeight: "500",
    cursor: "pointer",
    display: "-webkit-box",
    WebkitLineClamp: expanded ? "unset" : 3,
    WebkitBoxOrient: "vertical",
    overflow: expanded ? "visible" : "hidden",
    textOverflow: "ellipsis",
    whiteSpace: expanded ? "normal" : "initial",
  };

  // Estilos para la imagen del juego
  const imageContainerStyle = {
    width: "85px",
    height: "100%",
    flexShrink: 0,
    backgroundColor: "#1a1a1a",
  };

  const contentStyle = {
    padding: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    minWidth: "0",
  };

  const titleStyle = {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: "1.5rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontFamily: "upheaval, system-ui",
    cursor: "pointer",
    lineHeight: "1.2",
    marginBottom: "0.5rem",
  };

  const metaStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    color: "#9ca3af",
    fontSize: "0.85rem",
    marginBottom: "0.6rem",
  };

  const fechaStyle = {
    color: "#9ca3af",
    fontSize: "0.85rem",
  };

  const likeContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "8px",
    width: "100%",
  };

  const likeButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    background: liked ? "rgba(239,68,68,0.12)" : "transparent",
    border: "1px solid " + (liked ? "#ef4444" : "#3e4451"),
    color: liked ? "#ef4444" : "#9ca3af",
    cursor: isOwnReview ? "not-allowed" : "pointer",
    padding: "0.35rem 0.8rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    transition: "all 0.2s ease",
    minWidth: "95px",
    textAlign: "center",
  };

  const handleToggleLike = async () => {
    if (!id) return;
    if (isOwnReview) {
      window.alert("No puedes dar like a tu propia reseña.");
      return;
    }

    const endpoint = liked ? "unlike" : "like";

    try {
      const res = await fetch(`${API_BASE_URL}/resenas/${id}/${endpoint}`, {
        method: "PUT",
      });

      if (!res.ok) {
        console.error("Error en respuesta de like", res.status);
        return;
      }

      const likedReviews = [
        ...new Set(JSON.parse(localStorage.getItem("likedReviews") || "[]")),
      ];

      if (liked) {
        setLikes((prev) => Math.max(prev - 1, 0));
        setLiked(false);
        localStorage.setItem(
          "likedReviews",
          JSON.stringify(likedReviews.filter((rid) => rid !== id)),
        );
      } else {
        setLikes((prev) => prev + 1);
        setLiked(true);
        localStorage.setItem(
          "likedReviews",
          JSON.stringify([...likedReviews, id]),
        );
      }
    } catch (error) {
      console.error("Error al toggle like:", error);
    }
  };

  return (
    <div style={cardStyle}>
      {/* Imagen del juego a la izquierda */}
      <div
        style={imageContainerStyle}
        onClick={() => navigate(`/game/${gameId}`)}
      >
        {imagen ? (
          <img
            src={imagen}
            alt={titulo}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#555",
              cursor: "pointer",
            }}
          >
            🎮
          </div>
        )}
      </div>

      {/* Contenido a la derecha */}
      <div style={contentStyle}>
        {/* Título del juego */}
        <span style={titleStyle} onClick={() => navigate(`/game/${gameId}`)}>
          {titulo}
        </span>

        {/* Header con avatar y usuario */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <img
            src={avatar}
            alt={usuario}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "2px solid #3e4451",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/user/${id_usuario}`)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.95rem",
                fontFamily: "upheaval, system-ui",
                letterSpacing: "0.5px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/user/${id_usuario}`)}
            >
              {usuario}
            </span>
          </div>
        </div>

        {/* Puntuación con estrellas y fecha */}
        <div style={metaStyle}>
          {puntuacion !== null && puntuacion !== undefined && (
            <>
              <StarRating nota={puntuacion} size="1.2rem" />
              <span>{puntuacion}</span>
            </>
          )}
          <span style={fechaStyle}>{fecha || "Fecha no disponible"}</span>
        </div>

        {/* Contenido de la reseña */}
        <p
          role="button"
          tabIndex={0}
          aria-expanded={expanded}
          onClick={toggleExpanded}
          onKeyDown={onKeyDownToggle}
          style={descStyle}
        >
          {contenido}
        </p>
        {/* Botón de like */}
          <div style={likeContainerStyle}>
          <button
            onClick={handleToggleLike}
            disabled={isOwnReview}
            style={likeButtonStyle}
          >
            {liked ? "❤️" : "🤍"} {likes}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ReviewCard;
