import { useState } from "react";
import GameLibraryCard from "../components/GameLibraryCard.jsx";
import UserReviewCard from "../components/UserReviewCard.jsx";

function Home() {
    const JUEGOS_DATA = [
        {
            id: 1,
            nombre: "The Witcher 3: Wild Hunt",
            imagen:
                "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/qezXTVn1ExqBjVjR5Ipm97IK.png",
        },
        {
            id: 2,
            nombre: "Cyberpunk 2077",
            imagen:
                "https://image.api.playstation.com/vulcan/ap/rnd/202008/0416/6Bo40lnWU0BhgrOUm7Cb6by3.png",
        },
        {
            id: 3,
            nombre: "Pokémon Zafiro",
            imagen:
                "https://images.igdb.com/igdb/image/upload/t_cover_big/co1zhp.webp",
        },
        {
            id: 4,
            nombre: "Harry Potter y la Piedra Filosofal",
            imagen:
                "https://images.igdb.com/igdb/image/upload/t_cover_big/co3jh0.webp",
        },
    ];

    const REVIEWS_DATA = [
        {
            id: 101,
            juegoId: 1,
            titulo: "The Witcher 3: Wild Hunt",
            contenido: "Obra maestra absoluta.",
            puntuacion: 4.5,
            imagen:
                "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png",
        },
        {
            id: 102,
            juegoId: 2,
            titulo: "Cyberpunk 2077",
            contenido: "Ha mejorado mucho con los parches.",
            puntuacion: 5,
            imagen:
                "https://image.api.playstation.com/vulcan/ap/rnd/202008/0416/6Bo40lnWU0BhgrOUm7Cb6by3.png",
        },
    ];

    const getReviewScore = (gameId) => {
        const review = REVIEWS_DATA.find((r) => r.juegoId === gameId);
        return review ? review.puntuacion : undefined;
    };

    return (
        <div className="home-container">
            <h1>Nuevos lanzamientos</h1>

            <div className="games-grid" style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "left",
            }}
            >
                {JUEGOS_DATA.map((juego) => (
                    <GameLibraryCard
                        key={juego.id}
                        juego={juego}
                    />
                ))}
            </div>

            <h2>Reseñas destacadas</h2>
            <div className="reviews-grid">
                {REVIEWS_DATA.map((review) => (
                    <UserReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}
export default Home;