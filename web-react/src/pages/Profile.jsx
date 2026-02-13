import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FriendCard from "../components/FriendCard.jsx";
import UserReviewCard from "../components/UserReviewCard.jsx";
import GameLibraryCard from "../components/GameLibraryCard.jsx";
import ProfileListCard from "../components/ProfileListCard.jsx";
import ListCreator from "../components/ListCreator.jsx";

const API_BASE_URL = '/api';

function Perfil() {
  const navigate = useNavigate();
  const { id } = useParams(); // ID del usuario a ver (si viene de /user/:id)
  const [activeTab, setActiveTab] = useState("perfil");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Datos del usuario
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [juegos, setJuegos] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [listas, setListas] = useState([]);
  const [amigos, setAmigos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const loadProfileData = async () => {
    // Si hay un ID en la URL, es el perfil de otro usuario
    // Si no, es el perfil propio
    let idUsuario;
    
    if (id) {
      // Perfil de otro usuario
      idUsuario = parseInt(id);
    } else {
      // Perfil propio
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        navigate("/login");
        return;
      }
      const userData = JSON.parse(userStr);
      idUsuario = userData.id;
    }

    try {
      const [
        perfilRes,
        juegosRes,
        wishlistRes,
        reviewsRes,
        listasRes,
        amigosRes,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/perfil/${idUsuario}`),
        fetch(`${API_BASE_URL}/usuarios/${idUsuario}/juegos`),
        fetch(`${API_BASE_URL}/usuarios/${idUsuario}/wishlist`),
        fetch(`${API_BASE_URL}/usuarios/${idUsuario}/resenas`),
        fetch(`${API_BASE_URL}/listas/usuario/${idUsuario}`),
        fetch(`${API_BASE_URL}/usuarios/${idUsuario}/amigos?tipo=siguiendo`),
      ]);

      const perfilData = await perfilRes.json();
      const juegosData = await juegosRes.json();
      const wishlistData = await wishlistRes.json();
      const reviewsData = await reviewsRes.json();
      const listasData = await listasRes.json();
      const amigosData = await amigosRes.json();

      if (perfilData.ok) {
        setUser(perfilData.user);
        setStats(perfilData.stats);
      }

      if (Array.isArray(juegosData)) {
        setJuegos(juegosData.map(j => ({
          ...j,
          titulo: j.nombre,
          portada: j.imagen
        })));
      }
      if (Array.isArray(wishlistData)) {
        setWishlist(wishlistData.map(j => ({
          ...j,
          titulo: j.nombre,
          portada: j.imagen
        })));
      }
      if (Array.isArray(reviewsData)) setReviews(reviewsData);
      if (Array.isArray(listasData)) setListas(listasData);
      if (Array.isArray(amigosData)) setAmigos(amigosData);
    } catch (error) {
      console.error("Error cargando datos del perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, [navigate, id]); // Recargar cuando cambie el ID de usuario

  // Buscar usuarios
  const handleSearchUsers = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const userStr = localStorage.getItem("user");
      const userData = userStr ? JSON.parse(userStr) : null;
      const idUsuarioActual = userData ? userData.id : 0;

      const res = await fetch(
        `${API_BASE_URL}/usuarios/buscar?query=${encodeURIComponent(searchQuery)}&id_usuario_actual=${idUsuarioActual}`
      );
      const data = await res.json();

      if (data.ok) {
        setSearchResults(data.usuarios);
      } else {
        console.error("Error buscando usuarios:", data.message);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error buscando usuarios:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Seguir/Dejar de seguir usuario
  const handleFollowUser = async (idUsuarioSeguido, yaSigues) => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Debes estar logeado para seguir usuarios");
      return;
    }

    const userData = JSON.parse(userStr);
    const idUsuarioSeguidor = userData?.id;

    if (!idUsuarioSeguidor || !idUsuarioSeguido) {
      alert("Error: IDs de usuario no válidos");
      console.error("ID seguidor:", idUsuarioSeguidor, "ID seguido:", idUsuarioSeguido);
      return;
    }

    if (idUsuarioSeguidor === idUsuarioSeguido) {
      alert("No puedes seguirte a ti mismo");
      return;
    }

    try {
      const endpoint = yaSigues
        ? `${API_BASE_URL}/usuarios/${idUsuarioSeguidor}/seguir/${idUsuarioSeguido}`
        : `${API_BASE_URL}/usuarios/${idUsuarioSeguidor}/seguir`;

      const body = yaSigues
        ? {} // DELETE no necesita body
        : {
            id_seguido: idUsuarioSeguido,
          };

      console.log("Enviando:", body);

      const fetchOptions = {
        method: yaSigues ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
      };
      
      if (!yaSigues && Object.keys(body).length > 0) {
        fetchOptions.body = JSON.stringify(body);
      }
      
      const res = await fetch(endpoint, fetchOptions);

      const data = await res.json();
      console.log("Respuesta:", data);

      if (data.ok) {
        // Actualizar el estado local
        setSearchResults((prev) =>
          prev.map((u) =>
            u.id === idUsuarioSeguido ? { ...u, ya_sigues: !yaSigues } : u
          )
        );
        // Recargar lista de amigos
        await loadProfileData();
      } else {
        alert(data.message || "Error al seguir/dejar de seguir usuario");
      }
    } catch (error) {
      console.error("Error al seguir/dejar de seguir usuario:", error);
      alert("Error al seguir/dejar de seguir usuario");
    }
  };

  const getReviewScore = (gameId) => {
    const review = reviews.find((r) => r.juegoId === gameId);
    return review ? review.puntuacion : undefined;
  };

  if (loading || !user) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#ffffff" }}>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  // Avatar por defecto si no hay
  const avatarUrl = user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nombre}`;

  // Determinar si es el perfil propio o de otro usuario
  const userStr = localStorage.getItem("user");
  const currentUser = userStr ? JSON.parse(userStr) : null;
  const isOwnProfile = !id || (currentUser && currentUser.id === user.id);

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
              src={avatarUrl}
              alt="avatar"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div>
            <h2 style={{ margin: "0 0 5px 0", fontSize: "1.8rem", color: "white" }}>
              {user.nombre}
            </h2>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontFamily: "m6x11plus",
                fontSize: "1.5rem",
              }}
            >
              Se unió el {user.fecha_creacion}
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
              {stats?.juegos || 0} juegos
            </p>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontFamily: "m6x11plus",
                fontSize: "0.9rem",
              }}
            >
              {stats?.reseñas || 0} reseñas
            </p>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontFamily: "m6x11plus",
                fontSize: "0.9rem",
              }}
            >
              {stats?.listas || 0} listas
            </p>
            <p
              style={{
                color: "#9ca3af",
                margin: 0,
                fontFamily: "m6x11plus",
                fontSize: "0.9rem",
              }}
            >
              {stats?.siguiendo || 0} siguiendo
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
            <h2 style={{ color: "#ffffff" }}>Favoritos</h2>
            <div
              className="games-grid"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "left",
              }}
            >
              {juegos.slice(0, 5).map((juego) => (
                <div
                  key={juego.id}
                  onClick={() => navigate(`/game/${juego.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <GameLibraryCard
                    titulo={juego.titulo || juego.nombre}
                    portada={juego.portada || juego.imagen}
                    puntuacion={juego.rating}
                  />
                </div>
              ))}
            </div>
            <h2 style={{ color: "#ffffff", marginTop: "30px" }}>Actividad Reciente</h2>
            <div
              className="games-grid"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "left",
              }}
            >
              {juegos.slice(0, 5).map((juego) => (
                <div
                  key={juego.id}
                  onClick={() => navigate(`/game/${juego.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <GameLibraryCard
                    titulo={juego.titulo || juego.nombre}
                    portada={juego.portada || juego.imagen}
                    puntuacion={getReviewScore(juego.id)}
                  />
                </div>
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
            {juegos.map((juego) => (
              <div
                key={juego.id}
                onClick={() => navigate(`/game/${juego.id}`)}
                style={{ cursor: "pointer" }}
              >
                <GameLibraryCard
                  titulo={juego.titulo || juego.nombre}
                  portada={juego.portada || juego.imagen}
                  puntuacion={getReviewScore(juego.id)}
                />
              </div>
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
            {wishlist.map((juego) => (
              <div
                key={juego.id}
                onClick={() => navigate(`/game/${juego.id}`)}
                style={{ cursor: "pointer" }}
              >
                <GameLibraryCard
                  titulo={juego.titulo || juego.nombre}
                  portada={juego.portada || juego.imagen}
                  puntuacion={juego.rating}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {reviews.map((review) => (
              <div
                key={review.id}
                onClick={() => navigate(`/game/${review.juegoId}`)}
                style={{ cursor: "pointer" }}
              >
                <UserReviewCard
                  titulo={review.titulo}
                  contenido={review.contenido}
                  puntuacion={review.puntuacion}
                  imagen={review.imagen}
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === "listas" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {isOwnProfile && (
              <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
                <button
                  style={{
                    padding: "10px 20px",
                    background: "#2b303b",
                    border: "1px solid #3e4451",
                    borderRadius: "8px",
                    color: "#ffffff",
                    cursor: "pointer",
                  }}
                >
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
                    cursor: "pointer",
                  }}
                >
                  Crear lista
                </button>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {listas.map((lista) => (
                <div
                  key={lista.id}
                  onClick={() => navigate(`/list/${lista.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <ProfileListCard
                    nombre={lista.nombre}
                    autor={lista.autor}
                    juegos={lista.juegos}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "amigos" && (
          <div>
            {/* Buscador de usuarios - solo en perfil propio */}
            {isOwnProfile && (
              <div style={{ marginBottom: "30px", maxWidth: "500px" }}>
              <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={async (e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      await handleSearchUsers();
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: "10px 15px",
                    background: "#2b303b",
                    border: "1px solid #3e4451",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "1rem",
                  }}
                />
                <button
                  onClick={handleSearchUsers}
                  disabled={!searchQuery.trim() || isSearching}
                  style={{
                    padding: "10px 20px",
                    background: searchQuery.trim() && !isSearching ? "#29CDF2" : "#2b303b",
                    border: "1px solid #3e4451",
                    borderRadius: "8px",
                    color: searchQuery.trim() && !isSearching ? "#000000" : "#9ca3af",
                    cursor: searchQuery.trim() && !isSearching ? "pointer" : "not-allowed",
                    fontFamily: "upheaval, system-ui",
                    fontWeight: "bold",
                  }}
                >
                  {isSearching ? "Buscando..." : "Buscar"}
                </button>
              </div>

              {/* Resultados de búsqueda */}
              {searchResults.length > 0 && (
                <div style={{ marginBottom: "30px" }}>
                  <h3 style={{ color: "#ffffff", marginBottom: "15px" }}>Resultados de búsqueda</h3>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: "20px",
                    }}
                  >
                    {searchResults.map((usuario) => (
                      <div
                        key={usuario.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                          backgroundColor: "#2b303b",
                          padding: "15px 20px",
                          borderRadius: "12px",
                          border: "1px solid #3e4451",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{ display: "flex", alignItems: "center", gap: "15px", flex: 1, cursor: "pointer" }}
                          onClick={() => navigate(`/user/${usuario.id}`)}
                        >
                          {usuario.avatar ? (
                            <img
                              src={usuario.avatar}
                              alt={usuario.nombre}
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                                backgroundColor: "#3e4451",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#9ca3af",
                              }}
                            >
                              {usuario.nombre.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div style={{ color: "#ffffff", fontWeight: "bold" }}>
                              {usuario.nombre}
                            </div>
                            <div style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                              {usuario.juegos} {usuario.juegos === 1 ? "juego" : "juegos"}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFollowUser(usuario.id, usuario.ya_sigues);
                          }}
                          style={{
                            padding: "8px 16px",
                            background: usuario.ya_sigues ? "#2b303b" : "#29CDF2",
                            border: usuario.ya_sigues ? "1px solid #3e4451" : "none",
                            borderRadius: "8px",
                            color: usuario.ya_sigues ? "#9ca3af" : "#000000",
                            cursor: "pointer",
                            fontFamily: "upheaval, system-ui",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                          }}
                        >
                          {usuario.ya_sigues ? "Siguiendo" : "Seguir"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Lista de amigos (usuarios que sigues) */}
            <h3 style={{ color: "#ffffff", marginBottom: "15px" }}>Usuarios que sigues</h3>
            {amigos.length === 0 ? (
              <p style={{ color: "#9ca3af", textAlign: "center", padding: "40px" }}>
                No sigues a ningún usuario todavía. ¡Busca usuarios para seguir!
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "20px",
                }}
              >
                {amigos.map((amigo) => (
                  <FriendCard
                    key={amigo.id}
                    id={amigo.id}
                    nombre={amigo.nombre}
                    juegos={amigo.juegos}
                    avatar={amigo.avatar}
                    onClick={() => navigate(`/user/${amigo.id}`)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div
          style={{
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
          }}
        >
          <ListCreator
            onClose={() => {
              setIsModalOpen(false);
              loadProfileData(); // Recargar datos después de crear lista
            }}
            autor={user.nombre}
          />
        </div>
      )}
    </div>
  );
}

export default Perfil;
