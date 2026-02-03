import { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const HEADER_HEIGHT = 64;
const SIDEBAR_WIDTH = 180;

export default function AppLayout({ children }) {


  return (
    <div
      style={{
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
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
      <main
        style={{
          marginLeft: SIDEBAR_WIDTH,
          marginTop: HEADER_HEIGHT,
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
