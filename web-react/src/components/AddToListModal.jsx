import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

function AddToListModal({ onClose, idJuego, nombreJuego }) {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [addingTo, setAddingTo] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchListas = async () => {
      if (!user) return;
      try {
        const res = await fetch(`${API_BASE_URL}/listas/usuario/${user.id}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setListas(data);
        }
      } catch (error) {
        console.error("Error al cargar listas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListas();
  }, []);

  const handleAddToList = async (idLista, nombreLista) => {
    setMessage(null);
    setAddingTo(idLista);

    try {
      const res = await fetch(`${API_BASE_URL}/listas/${idLista}/juegos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_juego: idJuego }),
      });

      const data = await res.json();
      if (data.ok) {
        setMessage({ type: "success", text: `"${nombreJuego}" añadido a "${nombreLista}"` });
        // Cerrar después de 1.5 segundos
        setTimeout(() => onClose(), 1500);
      } else {
        setMessage({ type: "error", text: data.message || "Error al añadir" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error de conexión" });
    } finally {
      setAddingTo(null);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#2b303b",
          padding: "30px",
          borderRadius: "12px",
          border: "1px solid #3e4451",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          minWidth: "400px",
          maxWidth: "500px",
          maxHeight: "70vh",
          position: "relative",
        }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "transparent",
            border: "none",
            color: "#9ca3af",
            fontSize: "1.5rem",
            cursor: "pointer",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30px",
            height: "30px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
        >
          ✕
        </button>

        <h2
          style={{
            color: "#ffffff",
            margin: "0 0 8px 0",
            fontSize: "1.5rem",
            fontFamily: "upheaval, system-ui",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Añadir a Lista
        </h2>

        <p style={{ color: "#9ca3af", margin: "0 0 20px 0", fontSize: "0.9rem" }}>
          Selecciona una lista para añadir <strong style={{ color: "#29CDF2" }}>{nombreJuego}</strong>
        </p>

        {/* Mensaje de feedback */}
        {message && (
          <div
            style={{
              padding: "10px",
              marginBottom: "15px",
              backgroundColor: message.type === "success" ? "#10b981" : "#ef4444",
              color: "#ffffff",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            {message.text}
          </div>
        )}

        {/* Contenido */}
        {loading ? (
          <p style={{ color: "#9ca3af", textAlign: "center", padding: "20px" }}>
            Cargando listas...
          </p>
        ) : listas.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ color: "#9ca3af", marginBottom: "10px" }}>
              No tienes listas creadas todavía.
            </p>
            <p style={{ color: "#6b7280", fontSize: "0.85rem" }}>
              Crea una lista desde tu perfil primero.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              maxHeight: "40vh",
              overflowY: "auto",
              paddingRight: "5px",
            }}
          >
            {listas.map((lista) => {
              // Comprobar si el juego ya está en esta lista
              const yaEnLista = lista.juegos && lista.juegos.some((j) => j.id === idJuego);

              return (
                <button
                  key={lista.id}
                  onClick={() => !yaEnLista && handleAddToList(lista.id, lista.nombre)}
                  disabled={yaEnLista || addingTo === lista.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    backgroundColor: yaEnLista ? "#1a1f2b" : "#1f2937",
                    border: yaEnLista ? "1px solid #10b981" : "1px solid #3e4451",
                    borderRadius: "8px",
                    color: yaEnLista ? "#10b981" : "#ffffff",
                    cursor: yaEnLista ? "default" : "pointer",
                    fontFamily: "m6x11plus, system-ui",
                    fontSize: "1rem",
                    textAlign: "left",
                    transition: "all 0.2s",
                    opacity: addingTo === lista.id ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!yaEnLista) {
                      e.currentTarget.style.backgroundColor = "#29CDF2";
                      e.currentTarget.style.color = "#000000";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!yaEnLista) {
                      e.currentTarget.style.backgroundColor = "#1f2937";
                      e.currentTarget.style.color = "#ffffff";
                    }
                  }}
                >
                  <div>
                    <span style={{ fontWeight: "bold" }}>{lista.nombre}</span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.8rem",
                        color: yaEnLista ? "#10b981" : "#6b7280",
                        marginTop: "2px",
                      }}
                    >
                      {lista.juegos ? lista.juegos.length : 0} juegos
                    </span>
                  </div>
                  <span style={{ fontSize: "0.85rem" }}>
                    {yaEnLista
                      ? "✓ Ya añadido"
                      : addingTo === lista.id
                      ? "Añadiendo..."
                      : "＋"}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddToListModal;
