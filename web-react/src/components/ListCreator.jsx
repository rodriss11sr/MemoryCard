import { useState, useEffect } from "react";

const API_BASE_URL = '/api';

function ListCreator({ onClose, autor }) {
    const [nombre, setNombre] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);
    const [juegosSeleccionados, setJuegosSeleccionados] = useState([]);
    const [buscando, setBuscando] = useState(false);
    const [creando, setCreando] = useState(false);

    // Buscar juegos con debounce
    useEffect(() => {
        if (busqueda.length < 2) {
            setResultados([]);
            return;
        }

        const timer = setTimeout(async () => {
            setBuscando(true);
            try {
                const res = await fetch(`${API_BASE_URL}/juegos/buscar?q=${encodeURIComponent(busqueda)}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setResultados(data);
                }
            } catch (error) {
                console.error("Error buscando juegos:", error);
            } finally {
                setBuscando(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [busqueda]);

    const handleSeleccionarJuego = (juego) => {
        // No duplicar
        if (juegosSeleccionados.some((j) => j.id === juego.id)) return;
        setJuegosSeleccionados([...juegosSeleccionados, juego]);
        setBusqueda("");
        setResultados([]);
    };

    const handleQuitarJuego = (idJuego) => {
        setJuegosSeleccionados(juegosSeleccionados.filter((j) => j.id !== idJuego));
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

        setCreando(true);

        try {
            // 1. Crear la lista
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
                const idListaNueva = data.id;

                // 2. Añadir los juegos seleccionados a la lista
                for (const juego of juegosSeleccionados) {
                    try {
                        await fetch(`${API_BASE_URL}/listas/${idListaNueva}/juegos`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id_juego: juego.id }),
                        });
                    } catch (err) {
                        console.error(`Error añadiendo juego ${juego.id} a la lista:`, err);
                    }
                }

                setNombre("");
                setJuegosSeleccionados([]);
                onClose(); // Esto recargará los datos en Profile.jsx
            } else {
                alert(data.message || "Error al crear la lista");
            }
        } catch (error) {
            alert("Error al crear la lista");
        } finally {
            setCreando(false);
        }
    };

    // IDs ya seleccionados
    const idsSeleccionados = juegosSeleccionados.map((j) => j.id);

    return (
        <div style={{
            backgroundColor: "#2b303b",
            padding: "40px",
            borderRadius: "12px",
            border: "1px solid #3e4451",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            minWidth: "500px",
            maxWidth: "550px",
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
                Añadir Juegos (opcional)
            </label>

            {/* Buscador de juegos */}
            <div style={{ position: "relative", marginBottom: "15px" }}>
                <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar un juego..."
                    style={{
                        width: "100%",
                        padding: "12px 15px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        color: "#333",
                        fontSize: "1rem",
                        boxSizing: "border-box",
                    }}
                />

                {/* Dropdown de resultados */}
                {(resultados.length > 0 || buscando) && (
                    <div style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#1f2937",
                        border: "1px solid #3e4451",
                        borderRadius: "0 0 8px 8px",
                        maxHeight: "200px",
                        overflowY: "auto",
                        zIndex: 10,
                    }}>
                        {buscando ? (
                            <p style={{ color: "#9ca3af", textAlign: "center", padding: "10px", margin: 0 }}>
                                Buscando...
                            </p>
                        ) : (
                            resultados.map((juego) => {
                                const yaSeleccionado = idsSeleccionados.includes(juego.id);
                                return (
                                    <div
                                        key={juego.id}
                                        onClick={() => !yaSeleccionado && handleSeleccionarJuego(juego)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            padding: "8px 12px",
                                            cursor: yaSeleccionado ? "default" : "pointer",
                                            borderBottom: "1px solid #2b303b",
                                            transition: "background 0.15s",
                                            opacity: yaSeleccionado ? 0.5 : 1,
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!yaSeleccionado) e.currentTarget.style.backgroundColor = "#2b303b";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = "transparent";
                                        }}
                                    >
                                        {juego.imagen && (
                                            <img
                                                src={juego.imagen}
                                                alt={juego.nombre || juego.titulo}
                                                style={{
                                                    width: "35px",
                                                    height: "45px",
                                                    borderRadius: "4px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        )}
                                        <span style={{ color: "#ffffff", fontSize: "0.9rem" }}>
                                            {juego.nombre || juego.titulo}
                                        </span>
                                        {yaSeleccionado && (
                                            <span style={{ color: "#10b981", marginLeft: "auto", fontSize: "0.8rem" }}>
                                                ✓ Añadido
                                            </span>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>

            {/* Juegos seleccionados - preview con portadas */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "15px",
                marginBottom: "30px",
            }}>
                {[0, 1, 2].map((index) => {
                    const juego = juegosSeleccionados[index];
                    return (
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
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {juego ? (
                                <>
                                    {juego.imagen ? (
                                        <img
                                            src={juego.imagen}
                                            alt={juego.nombre || juego.titulo}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    ) : (
                                        <span style={{
                                            textAlign: "center",
                                            color: "#9ca3af",
                                            fontSize: "0.8rem",
                                            padding: "10px",
                                        }}>
                                            {juego.nombre || juego.titulo}
                                        </span>
                                    )}
                                    {/* Botón quitar */}
                                    <button
                                        onClick={() => handleQuitarJuego(juego.id)}
                                        style={{
                                            position: "absolute",
                                            top: "4px",
                                            right: "4px",
                                            background: "rgba(239, 68, 68, 0.9)",
                                            border: "none",
                                            borderRadius: "50%",
                                            color: "#fff",
                                            width: "22px",
                                            height: "22px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "0.7rem",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        ✕
                                    </button>
                                </>
                            ) : (
                                "🎮"
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Indicador si hay más de 3 juegos seleccionados */}
            {juegosSeleccionados.length > 3 && (
                <p style={{
                    color: "#9ca3af",
                    fontSize: "0.85rem",
                    textAlign: "center",
                    marginTop: "-20px",
                    marginBottom: "20px",
                }}>
                    +{juegosSeleccionados.length - 3} juegos más seleccionados
                </p>
            )}

            <button
                onClick={handleCrear}
                disabled={creando}
                style={{
                    width: "100%",
                    padding: "14px 20px",
                    background: creando ? "#6b7280" : "#29CDF2",
                    border: "none",
                    borderRadius: "8px",
                    color: creando ? "#ffffff" : "#000000",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: creando ? "default" : "pointer",
                    transition: "background 0.2s",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                }}
                onMouseEnter={(e) => { if (!creando) e.target.style.background = "#1ab8d4"; }}
                onMouseLeave={(e) => { if (!creando) e.target.style.background = "#29CDF2"; }}
            >
                {creando
                    ? `Creando${juegosSeleccionados.length > 0 ? ` y añadiendo ${juegosSeleccionados.length} juego${juegosSeleccionados.length > 1 ? "s" : ""}` : ""}...`
                    : "Crear"
                }
            </button>
        </div>
    );
}

export default ListCreator;
