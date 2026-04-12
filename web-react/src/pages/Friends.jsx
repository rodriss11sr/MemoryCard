import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Friends() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [tab, setTab] = useState("siguiendo");
  const [siguiendo, setSiguiendo] = useState([]);
  const [seguidores, setSeguidores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar usuarios
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  // Cargar amigos
  const fetchAmigos = async () => {
    if (!user.id) {
      setError("Debes iniciar sesión para ver tus amigos.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [sigRes, segRes] = await Promise.all([
        fetch(`${API_BASE_URL}/usuarios/${user.id}/amigos?tipo=siguiendo`),
        fetch(`${API_BASE_URL}/usuarios/${user.id}/amigos?tipo=seguidores`),
      ]);

      if (!sigRes.ok || !segRes.ok) {
        throw new Error("Error al conectar con el servidor");
      }

      const sigData = await sigRes.json();
      const segData = await segRes.json();
      if (Array.isArray(sigData)) setSiguiendo(sigData);
      if (Array.isArray(segData)) setSeguidores(segData);
    } catch (err) {
      console.error("Error cargando amigos:", err);
      setError("No se pudieron cargar los amigos. Comprueba que el servidor esté encendido.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmigos();
  }, []);

  // Buscar usuarios con debounce
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/usuarios/buscar?q=${encodeURIComponent(searchQuery.trim())}&id_usuario_actual=${user.id}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.ok && Array.isArray(data.usuarios)) {
            // Excluir al propio usuario
            setSearchResults(data.usuarios.filter((u) => u.id !== user.id));
          }
        }
      } catch (error) {
        console.error("Error buscando usuarios:", error);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Seguir usuario
  const [actionError, setActionError] = useState(null);

  const handleFollow = async (idSeguido) => {
    setActionError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/usuarios/${user.id}/seguir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_seguido: idSeguido }),
      });
      if (res.ok) {
        setSearchResults((prev) =>
          prev.map((u) => (u.id === idSeguido ? { ...u, ya_sigues: true } : u))
        );
        fetchAmigos();
      } else {
        const data = await res.json();
        setActionError(data.message || "No se pudo seguir al usuario");
      }
    } catch (err) {
      console.error("Error al seguir:", err);
      setActionError("Error de conexión al seguir al usuario");
    }
  };

  // Dejar de seguir
  const handleUnfollow = async (idSeguido) => {
    setActionError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/usuarios/${user.id}/seguir/${idSeguido}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSearchResults((prev) =>
          prev.map((u) => (u.id === idSeguido ? { ...u, ya_sigues: false } : u))
        );
        setSiguiendo((prev) => prev.filter((u) => u.id !== idSeguido));
      } else {
        const data = await res.json();
        setActionError(data.message || "No se pudo dejar de seguir al usuario");
      }
    } catch (err) {
      console.error("Error al dejar de seguir:", err);
      setActionError("Error de conexión al dejar de seguir al usuario");
    }
  };

  const listaActual = tab === "siguiendo" ? siguiendo : seguidores;

  // Comprobar si sigo a alguien (para la tab de seguidores, mostrar "Seguir de vuelta")
  const siguesA = (id) => siguiendo.some((u) => u.id === id);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#1b1f27", minHeight: "100vh", padding: "40px 20px", color: "#fff", textAlign: "center" }}>
        <p>Cargando amigos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: "#1b1f27", minHeight: "100vh", padding: "60px 20px" }}>
        <div style={{
          backgroundColor: "#2b303b",
          border: "1px solid #ef4444",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "500px",
          margin: "0 auto",
          textAlign: "center",
        }}>
          <p style={{ color: "#ef4444", fontSize: "1.5rem", margin: "0 0 10px 0" }}>⚠️</p>
          <p style={{ color: "#ffffff", fontSize: "1rem", margin: "0 0 8px 0" }}>{error}</p>
          <p style={{ color: "#9ca3af", fontSize: "0.85rem", margin: "0 0 20px 0" }}>
            Puede que el servidor no esté iniciado o haya un problema de conexión.
          </p>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={fetchAmigos}
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
            {!user.id && (
              <button
                onClick={() => navigate("/login")}
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
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#1b1f27", minHeight: "100vh", padding: "40px 20px" }}>
      {/* Titulo */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h1 style={{
          color: "#ffffff",
          fontFamily: "upheaval, system-ui",
          fontSize: "2.2rem",
          margin: 0,
        }}>
          {"Amigos"}
        </h1>
        <p style={{
          color: "#9ca3af",
          fontSize: "1rem",
          marginTop: "8px",
          fontFamily: "m6x11plus, system-ui",
        }}>
          Busca usuarios y gestiona a quien sigues
        </p>
      </div>

      {/* Buscador de usuarios */}
      <div style={{ maxWidth: "500px", margin: "0 auto 30px auto" }}>
        <input
          type="text"
          placeholder={"Buscar usuarios..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 20px",
            borderRadius: searchResults.length > 0 ? "10px 10px 0 0" : "10px",
            border: "1px solid #4b5563",
            backgroundColor: "#2b303b",
            color: "#ffffff",
            fontFamily: "m6x11plus, system-ui",
            fontSize: "1.1rem",
            outline: "none",
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
        />

        {/* Resultados de busqueda */}
        {searchQuery.trim().length >= 2 && (
          <div style={{
            backgroundColor: "#2b303b",
            border: "1px solid #4b5563",
            borderTop: "none",
            borderRadius: "0 0 10px 10px",
            maxHeight: "300px",
            overflowY: "auto",
          }}>
            {searching ? (
              <p style={{ color: "#9ca3af", textAlign: "center", padding: "15px", margin: 0 }}>
                Buscando...
              </p>
            ) : searchResults.length === 0 ? (
              <p style={{ color: "#9ca3af", textAlign: "center", padding: "15px", margin: 0 }}>
                No se encontraron usuarios
              </p>
            ) : (
              searchResults.map((usuario) => (
                <div
                  key={usuario.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 15px",
                    borderBottom: "1px solid #3e4451",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3e4451")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", flex: 1 }}
                    onClick={() => navigate(`/user/${usuario.id}`)}
                  >
                    <img
                      src={usuario.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${usuario.nombre}`}
                      alt={usuario.nombre}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid #29CDF2",
                      }}
                    />
                    <div>
                      <p style={{ margin: 0, color: "#fff", fontFamily: "upheaval, system-ui", fontSize: "0.9rem" }}>
                        {usuario.nombre}
                      </p>
                      <p style={{ margin: "2px 0 0 0", color: "#6b7280", fontSize: "0.75rem" }}>
                        {usuario.juegos} juegos
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => usuario.ya_sigues ? handleUnfollow(usuario.id) : handleFollow(usuario.id)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "upheaval, system-ui",
                      fontSize: "0.75rem",
                      transition: "all 0.2s",
                      backgroundColor: usuario.ya_sigues ? "#ef4444" : "#29CDF2",
                      color: usuario.ya_sigues ? "#fff" : "#000",
                      flexShrink: 0,
                    }}
                  >
                    {usuario.ya_sigues ? "Dejar de seguir" : "Seguir"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Mensaje de error de acción */}
      {actionError && (
        <div style={{
          maxWidth: "500px",
          margin: "0 auto 20px auto",
          padding: "12px 20px",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          border: "1px solid #ef4444",
          borderRadius: "8px",
          color: "#ef4444",
          textAlign: "center",
          fontSize: "0.9rem",
        }}>
          {actionError}
        </div>
      )}

      {/* Tabs */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginBottom: "30px",
      }}>
        <button
          onClick={() => setTab("siguiendo")}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontFamily: "upheaval, system-ui",
            fontSize: "0.95rem",
            transition: "all 0.2s ease",
            background: tab === "siguiendo" ? "#29CDF2" : "#2b303b",
            color: tab === "siguiendo" ? "#000" : "#9ca3af",
          }}
        >
          Siguiendo ({siguiendo.length})
        </button>
        <button
          onClick={() => setTab("seguidores")}
          style={{
            padding: "10px 24px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontFamily: "upheaval, system-ui",
            fontSize: "0.95rem",
            transition: "all 0.2s ease",
            background: tab === "seguidores" ? "#29CDF2" : "#2b303b",
            color: tab === "seguidores" ? "#000" : "#9ca3af",
          }}
        >
          Seguidores ({seguidores.length})
        </button>
      </div>

      {/* Lista de amigos */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        maxWidth: "600px",
        margin: "0 auto",
      }}>
        {listaActual.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ color: "#9ca3af", fontSize: "1rem", margin: "0 0 8px 0" }}>
              {tab === "siguiendo"
                ? "No sigues a nadie todavia"
                : "Nadie te sigue todavia"
              }
            </p>
            <p style={{ color: "#6b7280", fontSize: "0.85rem", margin: 0 }}>
              Usa el buscador de arriba para encontrar usuarios
            </p>
          </div>
        ) : (
          listaActual.map((amigo) => (
            <div
              key={amigo.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: "#2b303b",
                border: "1px solid #3e4451",
                borderRadius: "12px",
                padding: "16px 20px",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "14px", cursor: "pointer", flex: 1 }}
                onClick={() => navigate(`/user/${amigo.id}`)}
              >
                <img
                  src={amigo.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${amigo.nombre}`}
                  alt={amigo.nombre}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #29CDF2",
                  }}
                />
                <div>
                  <p style={{
                    margin: 0,
                    color: "#ffffff",
                    fontFamily: "upheaval, system-ui",
                    fontSize: "1rem",
                  }}>
                    {amigo.nombre}
                  </p>
                  <p style={{
                    margin: "3px 0 0 0",
                    color: "#6b7280",
                    fontSize: "0.8rem",
                  }}>
                    {amigo.juegos} juegos en su biblioteca
                  </p>
                </div>
              </div>

              {/* Boton de accion */}
              {tab === "siguiendo" ? (
                <button
                  onClick={() => handleUnfollow(amigo.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "6px",
                    border: "1px solid #ef4444",
                    backgroundColor: "transparent",
                    color: "#ef4444",
                    cursor: "pointer",
                    fontFamily: "upheaval, system-ui",
                    fontSize: "0.78rem",
                    transition: "all 0.2s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ef4444";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#ef4444";
                  }}
                >
                  Dejar de seguir
                </button>
              ) : (
                !siguesA(amigo.id) && (
                  <button
                    onClick={() => handleFollow(amigo.id)}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#29CDF2",
                      color: "#000",
                      cursor: "pointer",
                      fontFamily: "upheaval, system-ui",
                      fontSize: "0.78rem",
                      transition: "all 0.2s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#1fb5d6";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#29CDF2";
                    }}
                  >
                    Seguir de vuelta
                  </button>
                )
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Friends;
