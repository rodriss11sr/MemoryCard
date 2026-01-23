import { useState, useEffect } from 'react'
import './App.css'

// URL del backend API
const API_URL = 'http://localhost:3000/api'

function App() {
  const [likes, setLikes] = useState(0)
  const [juegos, setJuegos] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [listas, setListas] = useState([])
  const [reseñas, setReseñas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('juegos')

  // Cargar todos los datos desde la API
  useEffect(() => {
    async function cargarDatos() {
      try {
        setLoading(true)
        
        // Cargar todos los datos en paralelo
        const [juegosRes, usuariosRes, listasRes, reseñasRes] = await Promise.all([
          fetch(`${API_URL}/juegos`),
          fetch(`${API_URL}/usuarios`),
          fetch(`${API_URL}/listas`),
          // Usamos 'resenas' sin ñ para evitar problemas de codificación en la URL
          fetch(`${API_URL}/resenas`)
        ])
        
        if (!juegosRes.ok || !usuariosRes.ok || !listasRes.ok || !reseñasRes.ok) {
          throw new Error('Error al cargar los datos')
        }
        
        const [juegosData, usuariosData, listasData, reseñasData] = await Promise.all([
          juegosRes.json(),
          usuariosRes.json(),
          listasRes.json(),
          reseñasRes.json()
        ])
        
        setJuegos(juegosData)
        setUsuarios(usuariosData)
        setListas(listasData)
        setReseñas(reseñasData)
        setError(null)
      } catch (err) {
        console.error('Error:', err)
        setError('No se pudo conectar con el servidor. ¿Está el backend corriendo?')
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [])

  return (
    <>
      <header style={{ borderBottom: '1px solid #555', marginBottom: '20px', paddingBottom: '20px' }}>
        <h1>GameBoxd 🎮</h1>
        <p>Tu diario de videojuegos personal</p>
      </header>

      {/* Pestañas de navegación */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('juegos')}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: activeTab === 'juegos' ? '#646cff' : '#333',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          🎮 Juegos ({juegos.length})
        </button>
        <button 
          onClick={() => setActiveTab('usuarios')}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: activeTab === 'usuarios' ? '#646cff' : '#333',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          👥 Usuarios ({usuarios.length})
        </button>
        <button 
          onClick={() => setActiveTab('listas')}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: activeTab === 'listas' ? '#646cff' : '#333',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          📋 Listas ({listas.length})
        </button>
        <button 
          onClick={() => setActiveTab('reseñas')}
          style={{
            padding: '10px 20px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: activeTab === 'reseñas' ? '#646cff' : '#333',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          ✍️ Reseñas ({reseñas.length})
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Cargando datos...</p>
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
        <>
          {/* SECCIÓN: JUEGOS */}
          {activeTab === 'juegos' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>🎮 Juegos</h2>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {juegos.length === 0 ? (
                  <p style={{ color: '#888' }}>No hay juegos disponibles.</p>
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
                      {juego.generos && (
                        <p style={{ color: '#888', fontSize: '0.7rem', margin: '5px 0' }}>
                          {juego.generos.split(', ').slice(0, 2).join(', ')}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* SECCIÓN: USUARIOS */}
          {activeTab === 'usuarios' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>👥 Usuarios</h2>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {usuarios.length === 0 ? (
                  <p style={{ color: '#888' }}>No hay usuarios disponibles.</p>
                ) : (
                  usuarios.map(usuario => (
                    <div key={usuario.id_usuario} style={{ 
                      backgroundColor: '#1a1a1a', 
                      padding: '20px', 
                      borderRadius: '10px',
                      border: '1px solid #444',
                      width: '250px',
                      textAlign: 'center'
                    }}>
                      {usuario.avatar ? (
                        <img 
                          src={usuario.avatar} 
                          alt={usuario.nombre}
                          style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px' }}
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div style={{ fontSize: '50px', marginBottom: '10px' }}>👤</div>
                      )}
                      <h4 style={{ margin: '10px 0', fontSize: '1.1rem' }}>{usuario.nombre}</h4>
                      <p style={{ color: '#888', fontSize: '0.85rem', margin: '5px 0' }}>
                        {usuario.correo}
                      </p>
                      {usuario.fecha_creacion && (
                        <p style={{ color: '#aaa', fontSize: '0.75rem', margin: '5px 0' }}>
                          Miembro desde {new Date(usuario.fecha_creacion).getFullYear()}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* SECCIÓN: LISTAS */}
          {activeTab === 'listas' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>📋 Listas Públicas</h2>
              <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center' }}>
                {listas.length === 0 ? (
                  <p style={{ color: '#888' }}>No hay listas públicas disponibles.</p>
                ) : (
                  listas.map(lista => (
                    <div key={lista.id_lista} style={{ 
                      backgroundColor: '#1a1a1a', 
                      padding: '20px', 
                      borderRadius: '10px',
                      border: '1px solid #444',
                      width: '90%',
                      maxWidth: '600px'
                    }}>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{lista.nombre}</h3>
                      {lista.descripcion && (
                        <p style={{ color: '#aaa', fontSize: '0.9rem', margin: '5px 0' }}>
                          {lista.descripcion}
                        </p>
                      )}
                      <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>
                          Por: <strong>{lista.nombre_usuario}</strong>
                        </p>
                        <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>
                          {lista.total_juegos || 0} juegos
                        </p>
                      </div>
                      {lista.fecha_creacion && (
                        <p style={{ color: '#666', fontSize: '0.75rem', margin: '10px 0 0 0' }}>
                          Creada: {new Date(lista.fecha_creacion).toLocaleDateString('es-ES')}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* SECCIÓN: RESEÑAS */}
          {activeTab === 'reseñas' && (
            <div>
              <h2 style={{ marginBottom: '20px' }}>✍️ Reseñas Recientes</h2>
              <div style={{ display: 'flex', gap: '20px', flexDirection: 'column', alignItems: 'center' }}>
                {reseñas.length === 0 ? (
                  <p style={{ color: '#888' }}>No hay reseñas disponibles.</p>
                ) : (
                  reseñas.map(reseña => (
                    <div key={reseña.id_reseña} style={{ 
                      backgroundColor: '#1a1a1a', 
                      padding: '20px', 
                      borderRadius: '10px',
                      border: '1px solid #444',
                      width: '90%',
                      maxWidth: '700px'
                    }}>
                      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        {reseña.avatar_usuario ? (
                          <img 
                            src={reseña.avatar_usuario} 
                            alt={reseña.nombre_usuario}
                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        ) : (
                          <div style={{ fontSize: '30px' }}>👤</div>
                        )}
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>
                            {reseña.nombre_usuario}
                          </h4>
                          <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>
                            sobre <strong>{reseña.titulo_juego}</strong>
                          </p>
                        </div>
                        {reseña.nota && (
                          <div style={{ 
                            backgroundColor: '#646cff', 
                            color: 'white', 
                            padding: '5px 15px', 
                            borderRadius: '20px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold'
                          }}>
                            {reseña.nota}/10
                          </div>
                        )}
                      </div>
                      <p style={{ color: '#ddd', fontSize: '0.95rem', lineHeight: '1.6', margin: '10px 0' }}>
                        {reseña.texto}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          {reseña.spoilers && (
                            <span style={{ color: '#ff6b6b', fontSize: '0.8rem' }}>⚠️ Spoilers</span>
                          )}
                          <span style={{ color: '#888', fontSize: '0.8rem' }}>
                            ❤️ {reseña.likes || 0} likes
                          </span>
                        </div>
                        {reseña.fecha_publicacion && (
                          <p style={{ color: '#666', fontSize: '0.75rem', margin: 0 }}>
                            {new Date(reseña.fecha_publicacion).toLocaleDateString('es-ES')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </>
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