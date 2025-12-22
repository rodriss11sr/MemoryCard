import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // 1. En lugar de un contador, preparamos un estado para guardar la lista de juegos
  const [juegos, setJuegos] = useState([])

  // 2. useEffect hace la petición a tu API en cuanto se abre la página
  useEffect(() => {
    // Asegúrate de que esta ruta sea EXACTA a la de tu carpeta en htdocs
    fetch("http://localhost/TFG-MINUSVALIA/backend-php/api/get_juegos.php")
      .then(response => response.json())
      .then(data => {
        console.log("Juegos cargados:", data) // Esto saldrá en la consola del navegador (F12)
        setJuegos(data)
      })
      .catch(error => console.error("Error conectando con la API:", error))
  }, [])

  return (
    <>
      <h1>GameBoxd 🎮</h1>
      
      <div className="card">
        <h2>Catálogo de Juegos</h2>
        <p>Conectado a MySQL vía PHP</p>

        {/* 3. Aquí pintamos los juegos. Si no hay, mostramos "Cargando..." */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '20px' }}>
          
          {juegos.length === 0 ? (
            <p>Cargando datos o no hay conexión...</p>
          ) : (
            juegos.map((juego) => (
              <div key={juego.id} style={{ border: '1px solid #646cff', padding: '15px', borderRadius: '8px', textAlign: 'left' }}>
                <h3 style={{ marginTop: 0 }}>{juego.titulo}</h3>
                <p>{juego.descripcion}</p>
                <p><strong>Nota:</strong> {juego.nota_media} ⭐</p>
              </div>
            ))
          )}

        </div>
      </div>
    </>
  )
}

export default App