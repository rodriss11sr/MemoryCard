import { useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

const HEADER_HEIGHT = 64;

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 60 : 95;

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
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Header toggleSidebar={() => setCollapsed(!collapsed)} />
      </div>
      <Sidebar sidebarWidth={sidebarWidth} />
      <main
        style={{
          marginLeft: sidebarWidth,
          marginTop: HEADER_HEIGHT,
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
          width: `calc(100vw - ${sidebarWidth}px)`,
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
