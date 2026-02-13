import StarRating from "./StarRating";

function ReviewCard({ imagen, usuario, contenido, puntuacion, avatar }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        backgroundColor: "#2b303b",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #3e4451",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        marginBottom: "15px",
        alignItems: "flex-start",
      }}
    >
      {/* Imagen del juego a la izquierda */}
      <div
        style={{
          flex: "0 0 100px",
          minHeight: "140px",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#1f2937",
          border: "1px solid #3e4451",
        }}
      >
        <img
          src={imagen}
          alt="juego"
          style={{
            width: "100%",
            aspectRatio: "2/3",
            objectFit: "cover",
            borderRadius: "8px",
            backgroundColor: "#1a1a1a",
          }}
        />
      </div>

      {/* Contenido a la derecha */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
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
            }}
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
              }}
            >
              {usuario}
            </span>
          </div>
        </div>

        {/* Contenido de la reseña */}
        <p
          style={{
            color: "#d1d5db",
            fontSize: "0.9rem",
            margin: "5px 0 0 0",
            marginTop: "2px",
            fontWeight: "500",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
        {contenido}
      </p>

      {/* Puntuación con estrellas */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <StarRating nota={puntuacion} size="1.2rem" />
        <span
          style={{
            color: "#9ca3af",
            fontSize: "0.85rem",
            marginLeft: "5px",
          }}
        >
          {puntuacion}
        </span>
      </div>
    </div>
    </div >
  );
}

export default ReviewCard;
