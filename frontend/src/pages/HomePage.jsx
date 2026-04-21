import React from "react";
import TopBar from "../components/layout/TopBar.jsx";
import HomeCard from "../components/home/HomeCard.jsx";
import { navItems } from "../config/navItems.js";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#edf2f9",
        padding: 18,
        color: "#0f172a",
      }}
    >
      <TopBar />

      <section
        style={{
          maxWidth: 1180,
          margin: "28px auto 0",
          background: "#f8fbff",
          border: "1px solid #d8e3f2",
          borderRadius: 22,
          padding: "34px 32px 36px",
          boxShadow: "0 14px 36px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 38, fontWeight: 800 }}>
          PolarLearn dashboard
        </h1>
        <p
          style={{
            margin: "12px 0 0",
            color: "#475569",
            fontSize: 17,
            maxWidth: 760,
            lineHeight: 1.55,
          }}
        >
          Interaktívne prostredie pre návrh masky, kódovanie, SC dekódovanie,
          BER simuláciu a analýzu polarizácie kanálov pre polar codes.
        </p>

        <div
          style={{
            marginTop: 30,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 18,
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