import React from "react";
import logo from "../../assets/stu-fei-logo.png";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "#123a78",
        color: "#ffffff",
        borderRadius: 16,
        padding: "14px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 8px 24px rgba(10, 37, 78, 0.22)",
      }}
    >
      <img
        src={logo}
        alt="STU FEI"
        style={{ height: 52, width: "auto", objectFit: "contain" }}
      />

      {isAuthenticated && (
        <button
          type="button"
          onClick={handleLogout}
          style={{
            border: "1px solid rgba(255,255,255,0.35)",
            background: "rgba(255,255,255,0.1)",
            color: "#ffffff",
            borderRadius: 10,
            padding: "8px 14px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Log out
        </button>
      )}
    </header>
  );
}