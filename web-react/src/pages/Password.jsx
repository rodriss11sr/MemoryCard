import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Password() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    //TODO: Implementar la logica del backend para recuperar contraseña
    const handlePassword = (e) => {
        e.preventDefault();
        console.log("Contraseña recuperada:", email);
        navigate("/login");
    }

    //Estilos
    const containerStyle = {
        display: "flex",
        justifyContent: "center", // Centra horizontalmente (↔)
        flexDirection: "column", //Pone los elementos verticalmente
        alignItems: "center", // Centra verticalmente (↕)
        height: "100vh",
        width: "100vw",
    };
    const inputStyle = {
        width: "100%",
        padding: "12px",
        margin: "10px 0",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        color: "#828282",
        border: "1px solid var(--border-color)",
        fontFamily: "m6x11plus",
        fontSize: "1rem",
        boxSizing: "border-box",
    };

    const buttonStyle = {
        width: "100%",
        padding: "12px",
        marginTop: "20px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#0466c8",
        color: "white",
        fontFamily: "upheaval",
        fontWeight: "bold",
        fontSize: "1rem",
        cursor: "pointer",
        transition: "opacity 0.2s",
    };

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <h2 style={{ marginBottom: "5px" }}>Recuperar contraseña</h2>
                <p
                    style={{
                        color: "var(--text-secondary)",
                        marginBottom: "30px",
                        fontFamily: "m6x11plus",
                        fontSize: "1rem",
                    }}
                >
                    Ingresa el email y te enviaremos un correo para recuperar la cuenta
                </p>
            </div>
            <form onSubmit={handlePassword}>
                <div style={{ textAlign: "left" }}>
                    <label
                        style={{
                            fontSize: "0.8rem",
                            marginLeft: "5px",
                            color: "var(--text-secondary)",
                            fontFamily: "m6x11plus",
                        }}
                    >
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        placeholder="email@domain.com"
                        style={inputStyle}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {/* TODO: Cambiar a "submit" cuando este implementada la logica de inicio de sesion en el backend*/}
                <button
                    type="button"
                    onClick={handlePassword}
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                    onMouseOut={(e) => (e.target.style.opacity = "1")}
                >
                    Recuperar
                </button>
            </form>
            <p
                style={{
                    marginTop: "20px",
                    fontFamily: "m6x11plus",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                }}
            >
                ¿No tienes cuenta?{" "}
                <span
                    style={{ color: "#29CDF2", cursor: "pointer" }}
                    onClick={() => navigate("/signin")}
                >
                    Regístrate
                </span>
            </p>
        </div>
    );
}
export default Password;