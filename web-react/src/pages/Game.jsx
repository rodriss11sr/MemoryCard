import { useState } from "react";
import StarRating from "../components/StarRating";
import GameLibraryCard from "../components/GameLibraryCard";
import GameReviewCard from "../components/GameReviewCard";

function Game() {
  // Datos de ejemplo del juego
  const game = {
    id: 50,
    titulo: "Assassin's Creed",
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rrw.webp",
    fecha: "13/11/2007",
    plataforma: ["PS3", "Xbox 360"],
    desarrollador: "Ubisoft",
    genero: "Platform, Adventure, Action",
    descripcion:
      "Assassin's Creed is a non-linear action-adventure video game, during which the player controls a 12th-century Levantine Assassin named Altaïr Ibn-La'Ahad during the Third Crusade, whose life is experienced through the Animus by his 21st century descendant, Desmond Miles.",
    rating: 4.7,
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

  // Reseñas del juego
  const reviews = [
    {
      id: 1,
      usuario: "Relajao Relajao",
      foto: "https://api.dicebear.com/9.x/avataaars/svg?seed=Relajao",
      puntuacion: 4,
      fecha: "Ene 02, 2026",
      desc: "Hecho de menos el antiguo Ubisoft",
    },
    {
      id: 2,
      usuario: "John Bloodborne",
      foto: "https://api.dicebear.com/9.x/avataaars/svg?seed=JohnBloodborne",
      puntuacion: 1.5,
      fecha: "Ene 23, 2025",
      desc: "UBISOOOOFT, mu mala mu mala mu mala",
    },
  ];

  return (
    <div className="game-page">
      {/* Título del juego */}
      <h1 className="game-title" style={{ textAlign: "center" }}>
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
              style={{ objectFit: "cover", borderRadius: "12px" }}
              src={game.imagen}
              alt={game.titulo}
            />
          </div>

          <div className="game-info">
            <p className="game-description" style={{ maxWidth: "600px" }}>
              {game.descripcion}
            </p>
          </div>
          <div className="game-details">
            <div className="detail-row">
              <span className="label">Fecha de lanzamiento: </span>
              <span className="value" style={{ color: "#29CDF2" }}>
                {game.fechaLanzamiento}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Plataformas: </span>
              <span className="value" style={{ color: "#29CDF2" }}>
                {game.plataforma.join(", ")}
              </span>
            </div>

            <div className="detail-row">
              <span className="label">Desarrollador: </span>
              <span className="value" style={{ color: "#29CDF2" }}>
                {game.desarrollador}
              </span>
            </div>

            <div className="detail-row">
              <span className="label">Género: </span>
              <span className="value" style={{ color: "#29CDF2" }}>
                {game.genero}
              </span>
            </div>
          </div>
        </aside>
      </div>
      <div className="game-header"></div>

      {/* Sección de juegos relacionados */}
      <section className="related-games-section">
        <h2 className="section-title">Juegos Relacionados</h2>
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
        <h2 className="section-title">Reseñas</h2>
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
          {reviews.map((review) => (
            <GameReviewCard
              key={review.id}
              foto={review.foto}
              usuario={review.usuario}
              desc={review.desc}
              puntuacion={review.puntuacion}
              fecha={review.fecha}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Game;
