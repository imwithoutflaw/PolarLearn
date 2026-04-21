import React from "react";
import TopBar from "../components/layout/TopBar.jsx";
import HomeCard from "../components/home/HomeCard.jsx";
import { navItems } from "../config/navItems.js";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f8",
        padding: 18,
        color: "#0f172a",
      }}
    >
      <TopBar />

      <section
        style={{
          maxWidth: 1120,
          margin: "28px auto 0",
          background: "#f8fbff",
          border: "1px solid #d8e3f2",
          borderRadius: 20,
          padding: "30px 28px 34px",
          boxShadow: "0 14px 36px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 36, fontWeight: 800 }}>
          PolarLearn dashboard
        </h1>
        <p style={{ margin: "12px 0 0", color: "#475569", fontSize: 17 }}>
          Interaktívne akademické prostredie pre návrh, kódovanie, dekódovanie
          a analýzu polárnych kódov.
        </p>

        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {navItems.map((item) => (
            <HomeCard
              key={item.path}
              title={item.label}
              description={item.description}
              to={item.path}
            />
          ))}
        </div>
      </section>
    </div>
  );
}