import React from "react";
import Navbar from "./Navbar.jsx";

export default function PageContainer({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7" }}>
      <Navbar />
      <main style={{ padding: "24px 0" }}>{children}</main>
    </div>
  );
}