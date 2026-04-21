import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive =
    location.pathname === to || (to === "/mask" && location.pathname === "/");

  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        padding: "10px 14px",
        borderRadius: 10,
        fontWeight: 700,
        color: isActive ? "#111" : "#444",
        background: isActive ? "#e8f5e9" : "transparent",
        border: isActive ? "1px solid #a5d6a7" : "1px solid transparent",
      }}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "#ffffffee",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 20 }}>Polar Lab</div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <NavLink to="/mask">Mask</NavLink>
          <NavLink to="/encoder">Encoder</NavLink>
          <NavLink to="/decoder">Decoder</NavLink>
        </div>
      </div>
    </div>
  );
}