import React from "react";

export default function NoteBox({ children }) {
  return (
    <div
      style={{
        border: "1px solid #cfe8d4",
        background: "#edf7ef",
        color: "#173d21",
        borderRadius: 16,
        padding: 16,
        lineHeight: 1.6,
        fontSize: 16,
      }}
    >
      {children}
    </div>
  );
}