import { useState } from "react";
import FriendCard from "../components/FriendCard.jsx";
import UserReviewCard from "../components/UserReviewCard.jsx";
import GameLibraryCard from "../components/GameLibraryCard.jsx";
import ProfileListCard from "../components/ProfileListCard.jsx";
import ListCreator from "../components/ListCreator.jsx";


//TODO: Obtener datos desde el backend y utilizarlos
function Perfil() {
  const [activeTab, setActiveTab] = useState("perfil");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const LISTAS_DATA = [
    {
      id: 1,
      nombre: "Saga Assassin's Creed",
      autor: "Gordon Freeman",
      juegos: [
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
      ],
    },
  ];

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
    {
      id: 5,
      nombre: "Ronaldinho Soccer 64",
      imagen:
        "https://tse3.mm.bing.net/th/id/OIP.1XS4wUMa1Gm1jHWX4h6hgAHaFZ?rs=1&pid=ImgDetMain&o=7&rm=3",
    }
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
    <div style={{ paddingBottom: "50px" }} >
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
          <div>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontFamily: "m6x11plus",
                fontSize: "0.9rem",
              }}
            >

            </p>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontFamily: "m6x11plus",
                fontSize: "0.9rem",
              }}
            >

            </p>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontFamily: "m6x11plus",
                fontSize: "0.9rem",
              }}
            >
              Poner algo para rellenar el espacio
            </p>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontFamily: "m6x11plus",
                fontSize: "0.9rem",
              }}
            >
              y que no quede tan vacío,
            </p>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontFamily: "m6x11plus",
                fontSize: "0.9rem",
              }}
            >
              aunque no se me ocurre nada xd
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
        {["perfil", "juegos", "wishlist", "reviews", "listas", "amigos"].map((tab) => (
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
        {activeTab === "perfil" && (
          <div>
            <h2>Favoritos</h2>
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
                  nombre={juego.nombre}
                  portada={juego.imagen}
                />
              ))}
            </div>
            <h2>Actividad Reciente</h2>
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
                  nombre={juego.nombre}
                  portada={juego.imagen}
                  puntuacion={getReviewScore(juego.id)}
                />
              ))}
            </div>
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
        {activeTab === "reviews" && (
          <div>
            {REVIEWS_DATA.map((review) => (
              <UserReviewCard
                key={review.id}
                titulo={review.titulo}
                contenido={review.contenido}
                puntuacion={review.puntuacion}
                imagen={review.imagen}
              />
            ))}
          </div>
        )}
        {activeTab === "listas" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
              <button style={{
                padding: "10px 20px",
                background: "#2b303b",
                border: "1px solid #3e4451",
                borderRadius: "8px",
                color: "#ffffff",
                cursor: "pointer"
              }}>
                Buscar lista
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  padding: "10px 20px",
                  background: "#2b303b",
                  border: "1px solid #3e4451",
                  borderRadius: "8px",
                  color: "#ffffff",
                  cursor: "pointer"
                }}
              >
                Crear lista
              </button>
            </div>
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "center",
            }}>
              {LISTAS_DATA.map((lista) => (
                <ProfileListCard
                  key={lista.id}
                  nombre={lista.nombre}
                  autor={lista.autor}
                  juegos={lista.juegos}
                />
              ))}
            </div>
          </div>
        )}
        {activeTab === "amigos" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {AMIGOS_DATA.map((amigo) => (
              <FriendCard
                key={amigo.id}
                nombre={amigo.nombre}
                juegos={amigo.juegos}
              />
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <ListCreator onClose={() => setIsModalOpen(false)} autor="Gordon Freeman" />
        </div>
      )}
    </div >
  );
}

export default Perfil;
