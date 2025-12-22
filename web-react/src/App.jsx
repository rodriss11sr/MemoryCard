import { useState } from 'react'
import './App.css'

function App() {
  const [likes, setLikes] = useState(0)

  // Ejemplo de lo que sería vuestra base de datos (Database)
  const juegosEjemplo = [
    { id: 1, titulo: "Elden Ring", nota: "9.5", img: "⚔️" },
    { id: 2, titulo: "Zelda: TotK", nota: "10", img: "🛡️" },
    { id: 3, titulo: "Hollow Knight", nota: "9.0", img: "🪲" }
  ]

  return (
    <>
      <header style={{ borderBottom: '1px solid #555', marginBottom: '20px' }}>
        <h1>GameBoxd 🎮</h1>
        <p>Tu diario de videojuegos personal</p>
      </header>

      <div className="card">
        <input 
          type="text" 
          placeholder="Busca un juego para loguear..." 
          style={{ padding: '10px', borderRadius: '20px', border: 'none', width: '80%' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        {juegosEjemplo.map(juego => (
          <div key={juego.id} style={{ 
            backgroundColor: '#1a1a1a', 
            padding: '15px', 
            borderRadius: '10px',
            border: '1px solid #444',
            width: '120px'
          }}>
            <div style={{ fontSize: '30px' }}>{juego.img}</div>
            <h4>{juego.titulo}</h4>
            <p style={{ color: '#00e676' }}>★ {juego.nota}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '40px' }}>
        <button onClick={() => setLikes((likes) => likes + 1)}>
          ❤️ Dar amor al proyecto: {likes}
        </button>
        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '15px' }}>
          Conectado a: <code>localhost:phpMyAdmin</code> (Próximamente)
        </p>
      </div>

      <footer style={{ marginTop: '50px', opacity: 0.6 }}>
        <small>TFG - Equipo GameBoxd - 2025</small>
      </footer>
    </>
  )
}

export default App