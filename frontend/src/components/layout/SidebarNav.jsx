import React from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../config/navItems.js";

export default function SidebarNav() {
  return (
    <nav>
      <div
        style={{
          fontSize: 12,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#64748b",
          marginBottom: 10,
          fontWeight: 700,
        }}
      >
        Moduly
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              textDecoration: "none",
              borderRadius: 12,
              border: `1px solid ${isActive ? "#bcd2f0" : "transparent"}`,
              background: isActive ? "#e8f0fb" : "transparent",
              padding: "11px 12px",
              color: "#1f2937",
              fontWeight: isActive ? 700 : 600,
              fontSize: 15,
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}