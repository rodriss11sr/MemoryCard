import { useState } from "react";
import StarRating from "./StarRating";

const API_BASE_URL = '/api';

const GameReviewCard = ({ id, foto, usuario, desc, puntuacion, fecha, likes: likesInicial = 0 }) => {
  const [likes, setLikes] = useState(likesInicial);
  const [liked, setLiked] = useState(() => {
    // Comprobar si ya dio like (guardado en localStorage) - usar Set para evitar duplicados
    const likedReviews = JSON.parse(localStorage.getItem("likedReviews") || "[]");
    return likedReviews.some((rid) => rid === id);
  });
  const [animating, setAnimating] = useState(false);

  const handleToggleLike = async () => {
    if (!id) return;
    const endpoint = liked ? "unlike" : "like";

    try {
      const res = await fetch(`${API_BASE_URL}/resenas/${id}/${endpoint}`, {
        method: "PUT",
      });
      if (!res.ok) {
        console.error("Error en respuesta:", res.status);
        return;
      }

      // Leer localStorage actual y limpiar duplicados
      const likedReviews = [...new Set(JSON.parse(localStorage.getItem("likedReviews") || "[]"))];

      if (liked) {
        // Quitar like
        setLikes((prev) => Math.max(prev - 1, 0));
        setLiked(false);
        localStorage.setItem("likedReviews", JSON.stringify(likedReviews.filter((rid) => rid !== id)));
      } else {
        // Dar like
        setLikes((prev) => prev + 1);
        setLiked(true);
        setAnimating(true);
        setTimeout(() => setAnimating(false), 400);
        localStorage.setItem("likedReviews", JSON.stringify([...likedReviews, id]));
      }
    } catch (error) {
      console.error("Error al toggle like:", error);
    }
  };

  return (
    <div style={{
      backgroundColor: "#2b303b",
      border: "1px solid #3e4451",
      borderRadius: "12px",
      padding: "1.5rem",
      width: "100%",
      maxWidth: "600px",
    }}>
      {/* Cabecera: avatar + usuario + estrellas + fecha */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "0.75rem",
      }}>
        <img
          src={foto}
          alt={usuario}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h3 style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              fontFamily: "'Upheaval', system-ui",
            }}>
              {usuario}
            </h3>
            {puntuacion !== null && puntuacion !== undefined && (
              <StarRating nota={puntuacion / 2} />
            )}
          </div>
          <p style={{
            margin: "2px 0 0 0",
            color: "#6b7280",
            fontSize: "0.78rem",
          }}>
            {fecha}
          </p>
        </div>
      </div>

      {/* Contenido de la reseña */}
      <p style={{
        fontSize: "0.88rem",
        color: "#9ca3af",
        margin: "0 0 0.75rem 0",
        lineHeight: "1.55",
      }}>
        {desc}
      </p>

      {/* Footer: like */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        borderTop: "1px solid #3e4451",
        paddingTop: "0.75rem",
      }}>
        <button
          onClick={handleToggleLike}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: liked ? "rgba(239,68,68,0.1)" : "transparent",
            border: "none",
            color: liked ? "#ef4444" : "#9ca3af",
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: "6px",
            transition: "all 0.2s ease",
            fontSize: "0.88rem",
            transform: animating ? "scale(1.2)" : "scale(1)",
          }}
          onMouseEnter={(e) => {
            if (!liked) {
              e.currentTarget.style.color = "#ef4444";
              e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (!liked) {
              e.currentTarget.style.color = "#9ca3af";
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
        >
          {liked ? "❤️" : "🤍"} {likes}
        </button>
        <span style={{ color: "#4b5563", fontSize: "0.78rem" }}>
          {liked
            ? "¡Te gustó esta reseña!"
            : likes > 0
              ? `A ${likes} persona${likes !== 1 ? "s" : ""} les gustó`
              : "Sé el primero en darle like"
          }
        </span>
      </div>
    </div>
  );
};

export default GameReviewCard;
