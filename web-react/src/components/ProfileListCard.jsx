

const ProfileListCard = ({ nombre, juegos }) => {
    const cardStyle = {
        display: "flex",
        alignItems: "center",
        gap: "15px",
        backgroundColor: "#2b303b",
        padding: "15px 20px",
        borderRadius: "12px",
        border: "1px solid #3e4451",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        marginBottom: "10px",
        transition: "transform 0.2s ease, background-color 0.2s",
        cursor: "pointer",
    };

    

    return (

        <div style={cardStyle}>
            <span
                style={{
                    color: "#ffffff",
                    fontWeight: "800",
                    fontSize: "1.3rem",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontFamily: "upheaval, system-ui",
                }}
            >
                {nombre}
            </span>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {juegos.map((juego, index) => (
                    <span key={index} style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
                        {juego.imagen ? (
                            <img
                                src={juego.imagen}
                                alt={juego.nombre}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#555",
                                }}
                            >
                                🎮
                            </div>
                        )}
                    </span>
                ))}
            </div>
        </div>

    );

};
export default ProfileListCard;