import { useState } from "react";
import StarRating from "../components/StarRating";
import GameLibraryCard from "../components/GameLibraryCard";
import GameReviewCard from "../components/GameReviewCard";

function Game() {
  // Datos de ejemplo del juego
  const game = {
    id: 50,
    title: "Assassin's Creed",
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rrw.webp",
    releaseDate: "13/11/2007",
    platforms: ["PS3", "Xbox 360"],
    developer: "Ubisoft",
    genre: "Platform, Adventure, Action",
    description:
      "Assassin's Creed is a non-linear action-adventure video game, during which the player controls a 12th-century Levantine Assassin named Altaïr Ibn-La'Ahad during the Third Crusade, whose life is experienced through the Animus by his 21st century descendant, Desmond Miles.",
    rating: 4.7,
  };

  // Juegos relacionados
  const relatedGames = [
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
      username: "Relajao Relajao",
      userImage: "https://api.dicebear.com/9.x/avataaars/svg?seed=Relajao",
      rating: 4,
      date: "Ene 02, 2026",
      text: "Hecho de menos el antiguo Ubisoft",
    },
    {
      id: 2,
      username: "John Bloodborne",
      userImage: "https://api.dicebear.com/9.x/avataaars/svg?seed=JohnBloodborne",
      rating: 1.5,
      date: "Ene 23, 2025",
      text: "UBISOOOOFT, mu mala mu mala mu mala",
    },
  ];

  return (
    <div className="game-page">
      {/* Título del juego */}
      <h1 className="game-title">{game.title}</h1>

      {/* Sección principal del juego */}
      <div className="game-header">
        <div className="game-cover">
          <img src={game.image} alt={game.title} />
        </div>

        <div className="game-info">
          <div className="game-details">
            <div className="detail-row">
              <span className="label">Fecha de lanzamiento: </span>
              <span className="value">{game.releaseDate}</span>
            </div>

            <div className="detail-row">
              <span className="label">Plataformas: </span>
              <span className="value">{game.platforms.join(", ")}</span>
            </div>

            <div className="detail-row">
              <span className="label">Desarrollador: </span>
              <span className="value">{game.developer}</span>
            </div>

            <div className="detail-row">
              <span className="label">Género: </span>
              <span className="value">{game.genre}</span>
            </div>
          </div>

          <p className="game-description">{game.description}</p>
        </div>
      </div>

      {/* Sección de juegos relacionados */}
      <section className="related-games-section">
        <h2 className="section-title">Juegos Relacionados</h2>
        <div className="games-grid">
          {relatedGames.map((relatedGame) => (
            <GameLibraryCard
              key={relatedGame.id}
              titulo={relatedGame.nombre}
              portada={relatedGame.imagen}
            />
          ))}
        </div>
      </section>

      {/* Sección de reseñas */}
      <section className="reviews-section">
        <h2 className="section-title">Reseñas</h2>
        <div className="reviews-container">
          {reviews.map((review) => (
            <GameReviewCard
              key={review.id}
              userImage={review.userImage}
              userName={review.username}
              description={review.text}
              rating={review.rating}
              date={review.date}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Game;
