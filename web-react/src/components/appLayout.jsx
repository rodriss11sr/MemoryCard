import { useState } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

const HEADER_HEIGHT = 64; //Altura fija para el header
const SIDEBAR_WIDTH = 180;  //Ancho fijo para el sidebar

function AppLayout({ children }) {

  return (
    <div className="LayoutCompleto"
      style={{
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="Header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: HEADER_HEIGHT,
        }}
      >
        <Header/>
      </div>
      <Sidebar/>
      {/*Paginas que van dentro del layout*/}
      <main
        style={{
          marginLeft: SIDEBAR_WIDTH,  //Espacio del sidebar
          marginTop: HEADER_HEIGHT,   //Espacio del header
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
          padding: "20px",
          backgroundColor: "#1b1f27",
          transition: "all 0.3s ease",
          boxSizing: "border-box",
        }}
      >
        {children}  
      </main>
    </div>
  );
}

export default AppLayout;
