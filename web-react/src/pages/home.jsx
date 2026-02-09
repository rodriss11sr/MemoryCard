import { useState } from "react";
import GameLibraryCard from "../components/GameLibraryCard.jsx";
import ReviewCard from "../components/ReviewCard.jsx";

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
        {
            id: 50,
            nombre: "Assassin's Creed",
            imagen:
                "https://images.igdb.com/igdb/image/upload/t_cover_big/co1rrw.webp",
        },
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
            contenido: "Cyberpunk 2077 es un videojuego de rol de acción de disparos en primera persona desarrollado por CD Projekt RED y publicado por CD Projekt que se lanzó para Microsoft Windows, PlayStation 4 y Xbox One el 10 de diciembre de 2020, y posteriormente en PlayStation 5, Xbox Series X|S y Google Stadia el 15 de febrero de 2022 y finalmente en Nintendo Switch 2 el 5 de junio de 2025. Siendo una adaptación del juego de rol Cyberpunk 2020 de Mike Pondsmith, se establece cincuenta y siete años más tarde en la ciudad distópica de Night City, California. Es un mundo abierto con seis distritos diferentes, con una perspectiva de primera persona y los jugadores asumen el papel del personaje personalizable llamado V, quienes pueden mejorar sus estadísticas con experiencia. V tiene un arsenal de armas y opciones para combate cuerpo a cuerpo, los cuales pueden ser modificados.\n\nLa historia sigue la lucha de V, un/una mercenario/a de Night City que lidia con las consecuencias de un atraco que salió mal y que resulta en un biochip experimental cibernético que contiene un engrama de la legendaria estrella de rock y terrorista Johnny Silverhand, que amenaza con sobrescribir lentamente la mente de V. A medida que avanza la historia, V y Silverhand deben trabajar juntos para encontrar una manera de separarse y salvar la vida de V.\n\nEl videojuego fue desarrollado por CD Projekt RED, un estudio interno dentro de CD Projekt, usando el motor de videojuegos REDengine 4. Lanzaron una nueva división en Breslavia y se asociaron con Digital Scapes, Nvidia, QLOC y Jali Research para ayudar al desarrollo. El personal excede el número de los que trabajaron en The Witcher 3: Wild Hunt. Durante el evento E3 de 2019, se declaró la fecha oficial del lanzamiento del videojuego, y además se reveló que el actor Keanu Reeves formaría parte del elenco de personajes que tendrían relevancia en el transcurso del videojuego. Estos datos fueron presentados por el mismo actor en la presentación del videojuego en el evento E3, siendo el conductor del evento del videojuego.\n\nCyberpunk 2077 recibió elogios de la crítica por su narrativa, ambientación y gráficos. Sin embargo, algunos de sus elementos de juego recibieron respuestas mixtas, mientras que sus temas y representación de personajes transgénero recibieron algunas críticas. También ha sido muy criticado por los numerosos bugs, particularmente en las versiones de consola que sufrían problemas de rendimiento. En octubre de 2023, el videojuego había vendido más de 25 millones de unidades. Una expansión, Phantom Liberty, tuvo programado su estreno el 26 de septiembre de 2023[2]​ para la PC y en PlayStation 5 y Xbox Series X|S y vendió 3 millones de unidades una semana después de su lanzamiento. Su costo total de desarrollo y comercialización (incluidas actualizaciones y DLC) supera los $436 000 000,[3]​ lo que lo convierte en uno de los videojuegos más caros de desarrollo. Una secuela del videojuego ha sido anunciada y está actualmente en desarrollo.",
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
            <h2>Nuevos lanzamientos</h2>

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
            >{JUEGOS_DATA.map((juego) => (
                <div key={juego.id} style={{ flex: "0 0 auto", scrollSnapAlign: "start" }}>
                    <GameLibraryCard
                        key={juego.id}
                        nombre={juego.nombre}
                        portada={juego.imagen}
                    />
                </div>
            ))}
            </div>

            <h2>Reseñas destacadas</h2>
            <div className="reviews-grid" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
                {REVIEWS_DATA.map((review) => (
                    <ReviewCard
                        key={review.id}
                        titulo={review.titulo}
                        contenido={review.contenido}
                        puntuacion={review.puntuacion}
                        imagen={review.imagen}
                    />
                ))}
            </div>
        </div >
    );
}
export default Home;