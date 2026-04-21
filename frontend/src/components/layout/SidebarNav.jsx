import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../config/navItems.js";

export default function SidebarNav() {
  const location = useLocation();

  return (
    <div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          marginBottom: 28,
          color: "#111827",
        }}
      >
        app
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/mask" && location.pathname === "/");

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: "none",
                padding: "12px 14px",
                borderRadius: 14,
                fontSize: 16,
                fontWeight: isActive ? 700 : 500,
                color: "#374151",
                background: isActive ? "#dbe3f1" : "transparent",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}