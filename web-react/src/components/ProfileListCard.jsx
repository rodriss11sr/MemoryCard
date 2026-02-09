

const ProfileListCard = ({ nombre, juegos, autor }) => {
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
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
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
                {autor && (
                    <span
                        style={{
                            color: "#9ca3af",
                            fontSize: "0.85rem",
                            fontWeight: "400",
                            letterSpacing: "0.5px",
                        }}
                    >
                        de {autor}
                    </span>
                )}
            </div>

            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    width: 78 + 22 * (Math.max(0, (juegos || []).slice(0,4).length - 1)),
                    height: 104,
                }}>
                    {(juegos || []).slice(0,4).map((juego, index) => {
                        const left = index * 22;
                        const zIndex = 4 - index;
                        const isFront = index === 0;
                        return (
                            <div key={index} style={{
                                width: 78,
                                height: 104,
                                borderRadius: 8,
                                overflow: "hidden",
                                boxShadow: "0 6px 12px rgba(0,0,0,0.45)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                backgroundColor: "#1f2937",
                                position: "absolute",
                                top: 0,
                                left: left,
                                zIndex: zIndex,
                                transform: isFront ? "none" : "scale(0.98)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                {juego.imagen ? (
                                    <img src={juego.imagen} alt={juego.nombre} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                                ) : (
                                    <div style={{ color: "#9ca3af", fontSize: "1.6rem" }}>🎮</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    );

};
export default ProfileListCard;