import { useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';

const HEADER_HEIGHT = 64; 

// Recibimos 'children' para poder renderizar el contenido de las páginas dentro
export default function AppLayout({ children }) {
  // Estado para controlar si el sidebar está colapsado o no
  const [collapsed, setCollapsed] = useState(false);
  
  // Si está colapsado 60px, si no 95px (puedes ajustar esto)
  const sidebarWidth = collapsed ? 60 : 95; 

  return (
    <div style={{ overflow: 'hidden', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Header Fijo */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: HEADER_HEIGHT,
        background: 'white',
        borderBottom: '1px solid #e5e7eb'
      }}>
        {/* Pasamos setCollapsed al header por si quieres poner un botón de menú hamburguesa allí */}
        <Header toggleSidebar={() => setCollapsed(!collapsed)} />
      </div>

      {/* 2. Sidebar Fija */}
      {/* Le pasamos el ancho dinámico */}
      <Sidebar sidebarWidth={sidebarWidth} />
      
      {/* 3. Contenido Principal (Main) */}
      <main
        style={{
          marginLeft: sidebarWidth, // Deja espacio a la izquierda para el sidebar
          marginTop: HEADER_HEIGHT, // Deja espacio arriba para el header
          // Usamos min-height en lugar de height fijo para permitir scroll natural
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`, 
          width: `calc(100vw - ${sidebarWidth}px)`,
          padding: '20px', // Un poco de relleno interno
          background: '#fff',
          transition: 'all 0.3s ease', // Animación suave si cambia el ancho
          boxSizing: 'border-box'
        }}
      >
        {children}
      </main>

    </div>
  );
}