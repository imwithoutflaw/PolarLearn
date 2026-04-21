import React from "react";
import SidebarNav from "./SidebarNav.jsx";

export default function AppShell({ sidebarControls, children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        color: "#111827",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          minHeight: "100vh",
        }}
      >
        <aside
          style={{
            borderRight: "1px solid #d1d5db",
            padding: "28px 22px 40px 22px",
            background: "#eef2f7",
          }}
        >
          <SidebarNav />

          {sidebarControls && (
            <>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #cfd5df",
                  margin: "28px 0",
                }}
              />
              {sidebarControls}
            </>
          )}
        </aside>

        <main
          style={{
            padding: "36px 48px 56px 48px",
            background: "#f8fafc",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}