import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = '/api';

function Header() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const searchRef = useRef(null);

  // Buscar juegos cuando el usuario escribe (con un pequeño delay)
  useEffect(() => {
    if (query.trim().length < 2) {
      setResultados([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/juegos/buscar?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResultados(data);
          setMostrarResultados(true);
        }
      } catch (error) {
        console.error("Error buscando juegos:", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setMostrarResultados(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectGame = (id) => {
    setQuery("");
    setResultados([]);
    setMostrarResultados(false);
    navigate(`/game/${id}`);
  };

  // Obtener avatar del usuario logueado
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const avatarUrl = user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.nombre || 'User'}`;

  return (
    <header
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "#2d333e",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <h1
          onClick={() => navigate("/")}
          style={{ margin: 0, fontSize: "24px", cursor: "pointer" }}
        >
          Memory Card 🎮
        </h1>
      </div>

      {/* Buscador con resultados */}
      <div
        ref={searchRef}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          padding: "0 20px",
          position: "relative",
        }}
      >
        <div style={{ width: "100%", maxWidth: "500px", position: "relative" }}>
          <input
            type="text"
            placeholder="🔍 Buscar juego..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (resultados.length > 0) setMostrarResultados(true);
            }}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #4b5563",
              color: "#1a1a1a",
              padding: "8px 20px",
              borderRadius: mostrarResultados && resultados.length > 0 ? "10px 10px 0 0" : "10px",
              width: "100%",
              outline: "none",
              fontFamily: "m6x11plus",
              fontSize: "1.2rem",
              transition: "border-color 0.2s",
              boxSizing: "border-box",
            }}
          />

          {/* Dropdown de resultados */}
          {mostrarResultados && resultados.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#2b303b",
                border: "1px solid #4b5563",
                borderTop: "none",
                borderRadius: "0 0 10px 10px",
                maxHeight: "350px",
                overflowY: "auto",
                zIndex: 100,
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              }}
            >
              {resultados.map((juego) => (
                <div
                  key={juego.id}
                  onClick={() => handleSelectGame(juego.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 15px",
                    cursor: "pointer",
                    transition: "background-color 0.15s",
                    borderBottom: "1px solid #3e4451",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3e4451")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  {/* Miniatura del juego */}
                  <div
                    style={{
                      width: "40px",
                      height: "55px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      flexShrink: 0,
                      backgroundColor: "#1f2937",
                    }}
                  >
                    {juego.imagen ? (
                      <img
                        src={juego.imagen}
                        alt={juego.titulo}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                        }}
                      >
                        🎮
                      </div>
                    )}
                  </div>

                  {/* Info del juego */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        color: "#ffffff",
                        fontFamily: "upheaval, system-ui",
                        fontSize: "0.95rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {juego.titulo}
                    </p>
                    {juego.rating && (
                      <p
                        style={{
                          margin: "2px 0 0 0",
                          color: "#9ca3af",
                          fontSize: "0.8rem",
                        }}
                      >
                        ⭐ {juego.rating}/10
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mensaje si no hay resultados */}
          {mostrarResultados && query.trim().length >= 2 && resultados.length === 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#2b303b",
                border: "1px solid #4b5563",
                borderTop: "none",
                borderRadius: "0 0 10px 10px",
                padding: "15px",
                textAlign: "center",
                color: "#9ca3af",
                fontSize: "0.9rem",
                zIndex: 100,
              }}
            >
              No se encontraron juegos para "{query}"
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/profile")}
        >
          <span
            style={{
              color: "#ffffff",
              fontFamily: "upheaval, system-ui",
              fontSize: "0.95rem",
              letterSpacing: "0.5px",
            }}
          >
            {user.nombre || "Usuario"}
          </span>
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              background: "#fff",
              border: "2px solid #ffffff",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={avatarUrl}
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <div
          title="Cerrar sesión"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
      </div>
    </header>
  );
}
export default Header;
