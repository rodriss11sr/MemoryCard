import { useState } from "react";
import FriendCard from "../components/FriendCard.jsx";
import UserReviewCard from "../components/UserReviewCard.jsx";
import GameLibraryCard from "../components/GameLibraryCard.jsx";

//TODO: Obtener datos desde el backend y utilizarlos
function Perfil() {
  const [activeTab, setActiveTab] = useState("amigos");

  const WISHLIST_DATA = [
    {
      id: 90,
      nombre: "MySims Kingdom",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_original/co9jux.webp",
    },
    {
      id: 92,
      nombre: "Code Vein II",
      imagen:
        "https://images.igdb.com/igdb/image/upload/t_cover_big/co9xhi.webp",
    },
  ];

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

  const AMIGOS_DATA = [
    { id: 1, nombre: "John Bloodborne", juegos: 124 },
    { id: 2, nombre: "Relajao Relajao", juegos: 36 },
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
    <div style={{ paddingBottom: "50px" }}>
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
          }}
        >
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#fff",
              margin: "0 auto 15px auto",
              border: "4px solid #2b303b",
              overflow: "hidden",
            }}
          >

            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gordon"
              alt="avatar"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div>

            <h2 style={{ margin: "0 0 5px 0", fontSize: "1.8rem", color: "white" }}>
              Gordon Freeman
            </h2>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontFamily: "m6x11plus",
                fontSize: "1.5rem",
              }}
            >
              Se unió el 14-11-1998
            </p>
          </div>
        </aside>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
          borderBottom: "1px solid #3e4451",
          paddingBottom: "10px",
          overflowX: "auto",
        }}
      >
        {["juegos", "wishlist", "reviews", "listas", "amigos"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "transparent",
              border: "none",
              color: activeTab === tab ? "#29CDF2" : "#9ca3af",
              fontWeight: activeTab === tab ? "bold" : "normal",
              fontSize: "1rem",
              cursor: "pointer",
              padding: "5px 10px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "all 0.2s",
              fontFamily: "upheaval, system-ui",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
        {activeTab === "amigos" && (
          <div>
            {AMIGOS_DATA.map((amigo) => (
              <FriendCard
                key={amigo.id}
                nombre={amigo.nombre}
                juegos={amigo.juegos}
              />
            ))}
          </div>
        )}
        {activeTab === "juegos" && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {JUEGOS_DATA.map((juego) => (
              <GameLibraryCard
                key={juego.id}
                nombre={juego.nombre}
                portada={juego.imagen}
                puntuacion={getReviewScore(juego.id)}
              />
            ))}
          </div>
        )}
        {activeTab === "reviews" && (
          <div>
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
        )}
        {activeTab === "wishlist" && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            {WISHLIST_DATA.map((juego) => (
              <GameLibraryCard
                key={juego.id}
                nombre={juego.nombre}
                portada={juego.imagen}
                puntuacion={getReviewScore(juego.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;
