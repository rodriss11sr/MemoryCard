import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameLibraryCard from "../components/GameLibraryCard.jsx";
import ReviewCard from "../components/ReviewCard.jsx";

const API_BASE_URL = '/api';

function Home() {
    const [juegos, setJuegos] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [juegosRes, reviewsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/juegos`),
                fetch(`${API_BASE_URL}/resenas`),
            ]);

            if (!juegosRes.ok || !reviewsRes.ok) {
                throw new Error("Error al conectar con el servidor");
            }

            const juegosData = await juegosRes.json();
            const reviewsData = await reviewsRes.json();

            if (Array.isArray(juegosData)) {
                setJuegos(juegosData);
            }
            if (Array.isArray(reviewsData)) {
                setReviews(reviewsData.slice(0, 5));
            }
        } catch (err) {
            console.error("Error cargando datos de inicio:", err);
            setError("No se pudieron cargar los datos. Comprueba que el servidor esté encendido.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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

    if (loading) {
        return (
            <div className="home-container" style={{ textAlign: "center", padding: "60px 20px" }}>
                <p style={{ color: "#9ca3af", fontSize: "1.1rem" }}>Cargando contenido...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-container" style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{
                    backgroundColor: "#2b303b",
                    border: "1px solid #ef4444",
                    borderRadius: "12px",
                    padding: "30px",
                    maxWidth: "500px",
                    margin: "0 auto",
                }}>
                    <p style={{ color: "#ef4444", fontSize: "1.5rem", margin: "0 0 10px 0" }}>⚠️</p>
                    <p style={{ color: "#ffffff", fontSize: "1rem", margin: "0 0 8px 0" }}>{error}</p>
                    <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 20px 0" }}>
                        Puede que el servidor no esté iniciado o haya un problema de conexión.
                    </p>
                    <button
                        onClick={fetchData}
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

            <h2 style={{ color: "#ffffff" }}>{"Reviews destacadas"}</h2>
            <div className="reviews-grid" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                {reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        titulo={review.titulo}
                        contenido={review.contenido}
                        puntuacion={review.puntuacion}
                        imagen={review.imagen}
                        usuario={review.usuario}
                        avatar={review.avatar}
                        likes={review.likes}
                        id={review.id}
                        id_usuario={review.id_usuario}
                        gameId={review.juegoId}
                        fecha={review.fecha}
                    />
                ))}
            </div>
        </div>
    );
}
export default Home;
