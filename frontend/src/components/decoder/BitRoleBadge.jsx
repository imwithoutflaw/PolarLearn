import React from "react";

export default function BitRoleBadge({ role }) {
  const isFrozen = role === "frozen";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        color: isFrozen ? "#0d47a1" : "#1b5e20",
        background: isFrozen ? "#e3f2fd" : "#e8f5e9",
        border: `1px solid ${isFrozen ? "#90caf9" : "#a5d6a7"}`,
      }}
    >
      {role}
    </span>
  );
}