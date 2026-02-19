import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameLibraryCard from "../components/GameLibraryCard.jsx";
import ReviewCard from "../components/ReviewCard.jsx";

const API_BASE_URL = '/api';

function Home() {
    const [juegos, setJuegos] = useState([]);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [juegosRes, reviewsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/juegos`),
                    fetch(`${API_BASE_URL}/resenas`),
                ]);

                const juegosData = await juegosRes.json();
                const reviewsData = await reviewsRes.json();

                if (Array.isArray(juegosData)) {
                    setJuegos(juegosData);
                }
                if (Array.isArray(reviewsData)) {
                    setReviews(reviewsData.slice(0, 5));
                }
            } catch (error) {
                console.error("Error cargando datos de inicio:", error);
            }
        };

        fetchData();
    }, []);

    const juegosNuevos = [...juegos]
        .filter((j) => j.fecha)
        .sort((a, b) => {
            const [da, ma, aa] = a.fecha.split("/").map(Number);
            const [db, mb, ab] = b.fecha.split("/").map(Number);
            const dateA = new Date(aa, ma - 1, da);
            const dateB = new Date(ab, mb - 1, db);
            return dateB - dateA;
        })
        .slice(0, 10);

    return (
        <div className="home-container">
            <h2 style={{ color: "#ffffff" }}>Nuevos lanzamientos</h2>

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
                {juegosNuevos.map((juego) => (
                    <div
                        key={juego.id}
                        style={{ flex: "0 0 auto", scrollSnapAlign: "start" }}
                        onClick={() => navigate(`/game/${juego.id}`)}
                    >
                        <GameLibraryCard
                            key={juego.id}
                            titulo={juego.titulo}
                            portada={juego.imagen}
                            puntuacion={juego.rating}
                        />
                    </div>
                ))}
            </div>

            <h2 style={{ color: "#ffffff" }}>{"Rese\u00f1as destacadas"}</h2>
            <div className="reviews-grid" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
                {reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        titulo={review.titulo}
                        contenido={review.contenido}
                        puntuacion={review.puntuacion}
                        imagen={review.imagen}
                        usuario={review.usuario}
                        avatar={review.avatar}
                    />
                ))}
            </div>
        </div>
    );
}
export default Home;
