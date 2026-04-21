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
        padding: "14px 20px",
        borderRadius: 16,
        fontWeight: 800,
        fontSize: 18,
        color: isActive ? "#111" : "#333",
        background: isActive ? "#e8f5e9" : "transparent",
        border: isActive ? "2px solid #a5d6a7" : "2px solid transparent",
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
        zIndex: 20,
        background: "#ffffffee",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div
        style={{
          maxWidth: 1600,
          margin: "0 auto",
          padding: "18px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 26 }}>Polar Lab</div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <NavLink to="/mask">Mask</NavLink>
          <NavLink to="/encoder">Encoder</NavLink>
          <NavLink to="/decoder">Decoder</NavLink>
          <NavLink to="/ber">BER</NavLink>
        </div>
      </div>
    </div>
  );
}