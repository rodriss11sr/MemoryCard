import { useState } from "react";
import FriendCard from "../components/friendCard.jsx";

//TODO: Obtener datos desde el backend y utilizarlos
function Perfil() {
  const [activeTab, setActiveTab] = useState("juegos");

  const AMIGOS_DATA = [
  { id: 1, nombre: "John Bloodborne", juegos: 124 },
  { id: 2, nombre: "Relajao Relajao", juegos: 36 },
];

  return (
    <div style={{ paddingBottom: "50px" }}>
      <div
        style={{ textAlign: "center", marginBottom: "30px", marginTop: "10px" }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#fff",
            margin: "0 auto 15px auto",
            border: "4px solid #2b303b",
            overflow: "hidden",
          }}
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gordon"
            alt="avatar"
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <h2 style={{ margin: "0 0 5px 0", fontSize: "1.8rem", color: "white" }}>
          Gordon Freeman
        </h2>
        <p style={{ color: "#9ca3af", margin: 0, fontSize: "0.9rem" }}>
          Se unió el 14-11-1998
        </p>
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
        {["juegos", "wishlist", "reviews", "listas", "amigos"].map((tab) => (
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
              borderBottom:
                activeTab === tab
                  ? "3px solid #29CDF2"
                  : "3px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
        {activeTab === "amigos" && (
          <div>
            {AMIGOS_DATA.map((amigo) => (
              <FriendCard key={amigo.id} nombre={amigo.nombre} juegos={amigo.juegos} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Perfil;
