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
  const [error, setError] = useState(null);
  const [filtrosEstado, setFiltrosEstado] = useState({
    favorito: true,
    jugando: true,
    completado: true,
  });

  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);

  const loadProfileData = async () => {
    setLoading(true);
    setError(null);

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

      if (!perfilRes.ok) {
        throw new Error("No se pudo cargar el perfil del usuario");
      }

      const perfilData = await perfilRes.json();
      const juegosData = await juegosRes.json();
      const wishlistData = await wishlistRes.json();
      const reviewsData = await reviewsRes.json();
      const listasData = await listasRes.json();
      const amigosData = await amigosRes.json();

      if (perfilData.ok) {
        setUser(perfilData.user);
        setStats(perfilData.stats);
      } else {
        throw new Error(perfilData.message || "Error al cargar el perfil");
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
    } catch (err) {
      console.error("Error cargando datos del perfil:", err);
      setError(err.message || "Error al cargar el perfil. Comprueba tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, [navigate, id]); // Recargar cuando cambie el ID de usuario

  const getReviewScore = (gameId) => {
    const review = reviews.find((r) => r.juegoId === gameId);
    return review ? review.puntuacion : undefined;
  };

  // Filtrar y ordenar juegos según estado seleccionado
  const getFilteredAndSortedJuegos = () => {
    // Filtrar por estados seleccionados
    const filtered = filteredJuegos.filter(juego => {
      if (juego.estado === "favorito" && filtrosEstado.favorito) return true;
      if (juego.estado === "jugando" && filtrosEstado.jugando) return true;
      if (juego.estado === "completado" && filtrosEstado.completado) return true;
      return false;
    });

    // Ordenar: primero por puntuación (descendente), luego alfabéticamente
    return filtered.sort((a, b) => {
      const scoreA = getReviewScore(a.id);
      const scoreB = getReviewScore(b.id);

      // Si ambos tienen puntuación, ordenar por puntuación (descendente)
      if (scoreA !== undefined && scoreB !== undefined) {
        if (scoreB !== scoreA) return scoreB - scoreA;
      } else if (scoreA !== undefined) {
        return -1; // A va primero si tiene puntuación y B no
      } else if (scoreB !== undefined) {
        return 1; // B va primero si tiene puntuación y A no
      }

      // Si no hay diferencia de puntuación, ordenar alfabéticamente
      const titleA = (a.titulo || a.nombre).toLowerCase();
      const titleB = (b.titulo || b.nombre).toLowerCase();
      return titleA.localeCompare(titleB);
    });
  };

  // Toggle para filtros de estado
  const toggleFiltro = (estado) => {
    setFiltrosEstado(prev => ({
      ...prev,
      [estado]: !prev[estado]
    }));
  };

  // Filtrar juegos para excluir aquellos en wishlist
  const filteredJuegos = juegos.filter(juego => !wishlist.some(w => w.id === juego.id));

  // Filtrar juegos que tienen estado "favorito"
  const favoritos = juegos.filter(juego => juego.estado === "favorito");

  // Manejar el click en el avatar para mostrar el modal
  const handleAvatarClick = () => {
    const userStr = localStorage.getItem("user");
    const currentUser = userStr ? JSON.parse(userStr) : null;
    const isOwn = !id || (currentUser && user && currentUser.id === user.id);
    
    if (isOwn) {
      setNewAvatarUrl(user.avatar || "");
      setAvatarError("");
      setShowAvatarModal(true);
    }
  };

  // Guardar el nuevo avatar
  const handleSaveAvatar = async () => {
    if (!newAvatarUrl.trim()) {
      setAvatarError("La URL no puede estar vacía");
      return;
    }
    
    setIsSavingAvatar(true);
    setAvatarError("");
    
    try {
      const res = await fetch(`${API_BASE_URL}/usuarios/${user.id}/avatar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: newAvatarUrl }),
      });
      
      const data = await res.json();
      
      if (data.ok) {
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const userData = JSON.parse(userStr);
          userData.avatar = newAvatarUrl;
          localStorage.setItem("user", JSON.stringify(userData));
        }
        setUser({ ...user, avatar: newAvatarUrl });
        setShowAvatarModal(false);
      } else {
        setAvatarError(data.message || "Error al actualizar avatar");
      }
    } catch (err) {
      setAvatarError("Error de conexión con el servidor");
    } finally {
      setIsSavingAvatar(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#ffffff" }}>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{
          backgroundColor: "#2b303b",
          border: "1px solid #ef4444",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "500px",
          margin: "0 auto",
        }}>
          <p style={{ color: "#ef4444", fontSize: "1.5rem", margin: "0 0 10px 0" }}>⚠️</p>
          <p style={{ color: "#ffffff", fontSize: "1rem", margin: "0 0 8px 0" }}>
            {error || "No se pudo cargar el perfil"}
          </p>
          <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 20px 0" }}>
            Puede que el usuario no exista o haya un problema con el servidor.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={loadProfileData}
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
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "10px 24px",
                borderRadius: "8px",
                border: "1px solid #3e4451",
                backgroundColor: "#2b303b",
                color: "#9ca3af",
                cursor: "pointer",
                fontFamily: "upheaval, system-ui",
                fontSize: "0.95rem",
              }}
            >
              Volver al inicio
            </button>
          </div>
        </div>
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
            onClick={handleAvatarClick}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "#fff",
              margin: "0 auto 15px auto",
              border: "4px solid #2b303b",
              overflow: "hidden",
              cursor: isOwnProfile ? "pointer" : "default",
              position: "relative",
            }}
            title={isOwnProfile ? "Cambiar foto de perfil" : ""}
          >
            <img
              src={avatarUrl}
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {isOwnProfile && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "white",
                  fontSize: "0.7rem",
                  padding: "4px 0",
                  textAlign: "center",
                  fontFamily: "m6x11plus",
                }}
              >
                EDITAR
              </div>
            )}
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
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {favoritos.length > 0 ? (
                favoritos.slice(0, 5).map((juego) => (
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
                ))
              ) : (
                <p style={{ color: "#9ca3af", gridColumn: "1 / -1", textAlign: "center", padding: "20px" }}>
                  No tienes juegos marcados como favoritos
                </p>
              )}
            </div>
            <h2 style={{ color: "#ffffff", marginTop: "30px" }}>Actividad Reciente</h2>
            <div
              className="games-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "20px",
                justifyContent: "center",
              }}
            >
              {filteredJuegos.slice(0, 5).map((juego) => (
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
          <div>
            {/* Filtros de estado */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginBottom: "30px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => toggleFiltro("favorito")}
                style={{
                  padding: "8px 16px",
                  background: filtrosEstado.favorito ? "#29CDF2" : "#2b303b",
                  border: filtrosEstado.favorito ? "1px solid #29CDF2" : "1px solid #3e4451",
                  borderRadius: "8px",
                  color: filtrosEstado.favorito ? "#000000" : "#ffffff",
                  cursor: "pointer",
                  fontFamily: "upheaval, system-ui",
                  fontWeight: filtrosEstado.favorito ? "bold" : "normal",
                  fontSize: "0.9rem",
                }}
              >
                ⭐ Favoritos {filtrosEstado.favorito && "✓"}
              </button>
              <button
                onClick={() => toggleFiltro("jugando")}
                style={{
                  padding: "8px 16px",
                  background: filtrosEstado.jugando ? "#29CDF2" : "#2b303b",
                  border: filtrosEstado.jugando ? "1px solid #29CDF2" : "1px solid #3e4451",
                  borderRadius: "8px",
                  color: filtrosEstado.jugando ? "#000000" : "#ffffff",
                  cursor: "pointer",
                  fontFamily: "upheaval, system-ui",
                  fontWeight: filtrosEstado.jugando ? "bold" : "normal",
                  fontSize: "0.9rem",
                }}
              >
                🎮 Jugando {filtrosEstado.jugando && "✓"}
              </button>
              <button
                onClick={() => toggleFiltro("completado")}
                style={{
                  padding: "8px 16px",
                  background: filtrosEstado.completado ? "#29CDF2" : "#2b303b",
                  border: filtrosEstado.completado ? "1px solid #29CDF2" : "1px solid #3e4451",
                  borderRadius: "8px",
                  color: filtrosEstado.completado ? "#000000" : "#ffffff",
                  cursor: "pointer",
                  fontFamily: "upheaval, system-ui",
                  fontWeight: filtrosEstado.completado ? "bold" : "normal",
                  fontSize: "0.9rem",
                }}
              >
                ✅ Completados {filtrosEstado.completado && "✓"}
              </button>
            </div>

            {/* Juegos filtrados y ordenados */}
            {!filtrosEstado.favorito && !filtrosEstado.jugando && !filtrosEstado.completado ? (
              <div
                style={{
                  backgroundColor: "#2b303b",
                  border: "1px solid #3e4451",
                  borderRadius: "12px",
                  padding: "40px",
                  textAlign: "center",
                }}
              >
                <p style={{ color: "#9ca3af", fontSize: "1.1rem", margin: "0 0 10px 0" }}>
                  Selecciona al menos un filtro para ver tus juegos
                </p>
                <p style={{ color: "#666", fontSize: "0.9rem", margin: "0" }}>
                  Haz clic en los botones de arriba para filtrar por estado
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                {getFilteredAndSortedJuegos().length > 0 ? (
                  getFilteredAndSortedJuegos().map((juego) => (
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
                  ))
                ) : (
                  <p style={{ color: "#9ca3af", textAlign: "center", padding: "40px", width: "100%" }}>
                    No hay juegos en los filtros seleccionados
                  </p>
                )}
              </div>
            )}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
            {reviews.map((review) => (
              <UserReviewCard
                key={review.id}
                id={review.id}
                titulo={review.titulo}
                contenido={review.contenido}
                puntuacion={review.puntuacion}
                imagen={review.imagen}
                gameId={review.juegoId}
                fecha={review.fecha}
                id_usuario={review.id_usuario}
                likes={review.likes}
              />
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

      {/* Modal para cambiar Avatar */}
      {showAvatarModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#2b303b",
              border: "1px solid #3e4451",
              borderRadius: "12px",
              padding: "30px",
              width: "90%",
              maxWidth: "400px",
            }}
          >
            <h3 style={{ color: "#ffffff", marginTop: 0, marginBottom: "20px", textAlign: "center", fontFamily: "upheaval, system-ui" }}>
              Cambiar foto de perfil
            </h3>
            
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
              <img 
                src={newAvatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nombre}`} 
                alt="Vista previa" 
                style={{ 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "50%", 
                  objectFit: "cover",
                  border: "4px solid #29CDF2"
                }} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nombre}`;
                }}
              />
            </div>
            
            <div style={{ marginBottom: "20px" }}>
              <label style={{ color: "#9ca3af", display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>
                URL de la imagen
              </label>
              <input
                type="text"
                value={newAvatarUrl}
                onChange={(e) => setNewAvatarUrl(e.target.value)}
                placeholder="https://ejemplo.com/mifoto.jpg"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "1px solid #4b5563",
                  backgroundColor: "#1f2937",
                  color: "#ffffff",
                  boxSizing: "border-box",
                  fontFamily: "m6x11plus, system-ui"
                }}
              />
            </div>
            
            {avatarError && (
              <p style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "15px", textAlign: "center", fontFamily: "m6x11plus, system-ui" }}>
                {avatarError}
              </p>
            )}
            
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowAvatarModal(false)}
                style={{
                  padding: "10px 16px",
                  background: "transparent",
                  border: "1px solid #4b5563",
                  borderRadius: "8px",
                  color: "#d1d5db",
                  cursor: "pointer",
                  fontFamily: "upheaval, system-ui",
                }}
                disabled={isSavingAvatar}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveAvatar}
                style={{
                  padding: "10px 16px",
                  background: "#29CDF2",
                  border: "none",
                  borderRadius: "8px",
                  color: "#000",
                  cursor: "pointer",
                  fontFamily: "upheaval, system-ui",
                  fontWeight: "bold",
                  opacity: isSavingAvatar ? 0.7 : 1
                }}
                disabled={isSavingAvatar}
              >
                {isSavingAvatar ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Perfil;
