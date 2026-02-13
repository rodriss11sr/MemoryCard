
import { useState } from "react";

const API_BASE_URL = '/api';

function ListCreator({ onClose, autor }) {
    const [nombre, setNombre] = useState("");
    const [juego, setJuego] = useState("");
    const [juegos, setJuegos] = useState([]);

    const handleAgregarJuego = () => {
        if (juego.trim() !== "") {
            setJuegos([...juegos, juego]);
            setJuego("");
        }
    };

    const handleCrear = async () => {
        if (nombre.trim() === "") {
            alert("El nombre de la lista no puede estar vacío.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!user) {
            alert("Debes estar logeado");
            return;
        }

        try {
            // Crear la lista
            const res = await fetch(`${API_BASE_URL}/listas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_usuario: user.id,
                    nombre: nombre,
                    descripcion: "",
                    publica: true,
                }),
            });

            const data = await res.json();
            if (data.ok) {
                setNombre("");
                setJuegos([]);
                onClose(); // Esto recargará los datos en Profile.jsx
            } else {
                alert(data.message || "Error al crear la lista");
            }
        } catch (error) {
            alert("Error al crear la lista");
        }
    };

    return (
        <div style={{
            backgroundColor: "#2b303b",
            padding: "40px",
            borderRadius: "12px",
            border: "1px solid #3e4451",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            minWidth: "500px",
            position: "relative",
        }}>
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
                onMouseEnter={(e) => e.target.style.color = "#ffffff"}
                onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
            >
                ✕
            </button>

            <h2 style={{
                color: "#ffffff",
                margin: "0 0 30px 0",
                fontSize: "1.8rem",
                fontFamily: "upheaval, system-ui",
                letterSpacing: "2px",
                textTransform: "uppercase",
            }}>
                Crear Lista
            </h2>
            
            <label style={{
                display: "block",
                color: "#9ca3af",
                fontSize: "0.9rem",
                marginBottom: "8px",
                fontWeight: "600",
                letterSpacing: "1px",
                textTransform: "uppercase",
            }}>
                Nombre de la Lista
            </label>
            <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juegos del espacio"
                style={{
                    width: "100%",
                    padding: "12px 15px",
                    marginBottom: "25px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    color: "#333",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                }}
                onKeyPress={(e) => e.key === "Enter" && handleAgregarJuego()}
            />

            <label style={{
                display: "block",
                color: "#9ca3af",
                fontSize: "0.9rem",
                marginBottom: "8px",
                fontWeight: "600",
                letterSpacing: "1px",
                textTransform: "uppercase",
            }}>
                Nombre del Juego
            </label>
            <input
                type="text"
                value={juego}
                onChange={(e) => setJuego(e.target.value)}
                placeholder="Buscar un juego..."
                style={{
                    width: "100%",
                    padding: "12px 15px",
                    marginBottom: "25px",
                    backgroundColor: "#ffffff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    color: "#333",
                    fontSize: "1rem",
                    boxSizing: "border-box",
                }}
                onKeyPress={(e) => e.key === "Enter" && handleAgregarJuego()}
            />

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "15px",
                marginBottom: "30px",
            }}>
                {[0, 1, 2].map((index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: "#1f2937",
                            borderRadius: "8px",
                            border: "1px solid #3e4451",
                            aspectRatio: "3/4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#555",
                            fontSize: "2rem",
                        }}
                    >
                        {juegos[index] ? (
                            <span style={{ textAlign: "center", color: "#9ca3af", fontSize: "0.8rem", padding: "10px" }}>
                                {juegos[index]}
                            </span>
                        ) : (
                            "🎮"
                        )}
                    </div>
                ))}
            </div>

            <button
                onClick={handleCrear}
                style={{
                    width: "100%",
                    padding: "14px 20px",
                    background: "#29CDF2",
                    border: "none",
                    borderRadius: "8px",
                    color: "#000000",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                }}
                onMouseEnter={(e) => e.target.style.background = "#1ab8d4"}
                onMouseLeave={(e) => e.target.style.background = "#29CDF2"}
            >
                Crear
            </button>
        </div>
    );
}

export default ListCreator;