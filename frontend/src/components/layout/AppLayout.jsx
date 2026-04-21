import React from "react";
import TopBar from "./TopBar.jsx";
import SidebarNav from "./SidebarNav.jsx";

export default function AppLayout({ sidebarControls, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f8",
        color: "#0f172a",
        padding: 18,
      }}
    >
      <TopBar />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: 18,
          marginTop: 18,
        }}
      >
        <aside
          style={{
            background: "#f8fbff",
            border: "1px solid #d7e2f0",
            borderRadius: 16,
            padding: 18,
            boxShadow: "0 4px 16px rgba(15, 23, 42, 0.07)",
          }}
        >
          <SidebarNav />

          {sidebarControls && (
            <>
              <div
                style={{
                  height: 1,
                  background: "#d7e2f0",
                  margin: "18px 0",
                }}
              />
              {sidebarControls}
            </>
          )}
        </aside>

        <main
          style={{
            background: "#ffffff",
            borderRadius: 16,
            border: "1px solid #dbe5f2",
            boxShadow: "0 10px 28px rgba(15, 23, 42, 0.08)",
            padding: "30px 32px 36px",
            minWidth: 0,
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}