import { useNavigate } from "react-router-dom";

function Header({ toggleSidebar }) {
    const navigate = useNavigate();

    return (
        <header style={{ 
            height: "100%", 
            display: "flex", 
            alignItems: "center", 
            padding: "0 20px", 
            justifyContent: "space-between" 
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {/* Botón opcional para colapsar menú */}
                <button onClick={toggleSidebar} style={{ cursor: "pointer", border: "none", background: "transparent", fontSize: "20px" }}>
                    ☰
                </button>
                <h1 
                    onClick={() => navigate('/')} 
                    style={{ margin: 0, fontSize: "24px", cursor: "pointer" }}
                >
                    GameBoxd 🎮
                </h1>
            </div>
            
            {/* Ejemplo de parte derecha del header */}
            <div>
                <span>Usuario</span>
            </div>
        </header>
    );
}
export default Header;