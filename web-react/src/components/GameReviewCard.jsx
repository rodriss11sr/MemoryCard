import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./starRating";
const API_BASE_URL = "/api";

const GameReviewCard = ({
  id,
  foto,
  usuario,
  desc,
  puntuacion,
  fecha,
  likes: likesInicial = 0,
  id_usuario,
}) => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const isOwnReview = currentUser && currentUser.id === id_usuario;
  const [likes, setLikes] = useState(likesInicial);
  const [liked, setLiked] = useState(() => {
    // Comprobar si ya dio like (guardado en localStorage) - usar Set para evitar duplicados
    const likedReviews = JSON.parse(
      localStorage.getItem("likedReviews") || "[]",
    );
    return likedReviews.some((rid) => rid === id);
  });
  const [animating, setAnimating] = useState(false);

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

  // Estilos para la imagen del usuario
  const imageContainerStyle = {
    width: "85px",
    height: "85px",
    flexShrink: 0,
    backgroundColor: "#1a1a1a",
    borderRadius: "50%",
    overflow: "hidden",
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

  const userImageStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  };

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

      const dateStyle = {
        color: "#9ca3af",
        fontSize: "0.85rem",
      };

      const wrapperStyle = {
        display: "flex",
        gap: "1.5rem",
        width: "100%",
        alignItems: "center",
      };

      // Leer localStorage actual y limpiar duplicados
      const likedReviews = [
        ...new Set(JSON.parse(localStorage.getItem("likedReviews") || "[]")),
      ];
      if (liked) {
        // Quitar like
        setLikes((prev) => Math.max(prev - 1, 0));
        setLiked(false);
        localStorage.setItem(
          "likedReviews",
          JSON.stringify(likedReviews.filter((rid) => rid !== id)),
        );
      } else {
        // Dar like
        setLikes((prev) => prev + 1);
        setLiked(true);
        setAnimating(true);
        setTimeout(() => setAnimating(false), 400);
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
      {/* Imagen del usuario a la izquierda */}
      <div
        style={imageContainerStyle}
        onClick={() => navigate(`/user/${id_usuario}`)}
      >
        <img
          src={foto}
          alt={usuario}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            cursor: "pointer",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Contenido a la derecha */}
      <div style={contentStyle}>
        {/* Nombre del usuario */}
        <span style={titleStyle} onClick={() => navigate(`/user/${id_usuario}`)}>
          {usuario}
        </span>

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
          {desc}
        </p>

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
};

export default GameReviewCard;
