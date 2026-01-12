import { useState, useEffect } from 'react'
import './App.css'

// URL del backend API
const API_URL = 'http://localhost:3000/api'

function App() {
  const [likes, setLikes] = useState(0)
  const [juegos, setJuegos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar juegos desde la API
  useEffect(() => {
    async function cargarJuegos() {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/juegos`)
        
        if (!response.ok) {
          throw new Error('Error al cargar los juegos')
        }
        
        const data = await response.json()
        setJuegos(data)
        setError(null)
      } catch (err) {
        console.error('Error:', err)
        setError('No se pudo conectar con el servidor. ¿Está el backend corriendo?')
      } finally {
        setLoading(false)
      }
    }

    cargarJuegos()
  }, [])

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

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Cargando juegos...</p>
        </div>
      )}

      {error && (
        <div style={{ 
          backgroundColor: '#ff4444', 
          color: 'white', 
          padding: '15px', 
          borderRadius: '10px',
          margin: '20px 0',
          textAlign: 'center'
        }}>
          <p>⚠️ {error}</p>
          <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
            Asegúrate de que el backend esté corriendo en http://localhost:3000
          </p>
        </div>
      )}

      {!loading && !error && (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px', flexWrap: 'wrap' }}>
          {juegos.length === 0 ? (
            <p style={{ color: '#888' }}>No hay juegos disponibles. Agrega algunos desde el backend.</p>
          ) : (
            juegos.map(juego => (
              <div key={juego.id_juego} style={{ 
                backgroundColor: '#1a1a1a', 
                padding: '15px', 
                borderRadius: '10px',
                border: '1px solid #444',
                width: '200px',
                textAlign: 'center'
              }}>
                {juego.portada ? (
                  <img 
                    src={juego.portada} 
                    alt={juego.titulo}
                    style={{ width: '100%', borderRadius: '5px', marginBottom: '10px' }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                ) : (
                  <div style={{ fontSize: '50px', marginBottom: '10px' }}>🎮</div>
                )}
                <h4 style={{ margin: '10px 0', fontSize: '1rem' }}>{juego.titulo}</h4>
                {juego.fecha_lanzamiento && (
                  <p style={{ color: '#888', fontSize: '0.8rem', margin: '5px 0' }}>
                    {new Date(juego.fecha_lanzamiento).getFullYear()}
                  </p>
                )}
                {juego.plataformas && (
                  <p style={{ color: '#aaa', fontSize: '0.75rem', margin: '5px 0' }}>
                    {juego.plataformas.split(', ').slice(0, 2).join(', ')}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <div className="card" style={{ marginTop: '40px' }}>
        <button onClick={() => setLikes((likes) => likes + 1)}>
          ❤️ Dar amor al proyecto: {likes}
        </button>
        <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '15px' }}>
          {error ? (
            <>❌ Backend desconectado</>
          ) : loading ? (
            <>⏳ Conectando...</>
          ) : (
            <>✅ Conectado a: <code>http://localhost:3000</code></>
          )}
        </p>
      </div>

      <footer style={{ marginTop: '50px', opacity: 0.6 }}>
        <small>TFG - Equipo GameBoxd - 2025</small>
      </footer>
    </>
  )
}

export default App