import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthShell from "../components/auth/AuthShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Log in"
      subtitle="Sign in to access PolarLearn."
    >
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />

        {error && <div style={errorStyle}>{error}</div>}

        <button type="submit" style={buttonStyle} disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div style={{ marginTop: 18, color: "#475569" }}>
        Don’t have an account?{" "}
        <Link to="/register">Register</Link>
      </div>
    </AuthShell>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 8,
  marginTop: 14,
  fontWeight: 700,
  color: "#334155",
};

const inputStyle = {
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  padding: "14px 16px",
  borderRadius: 14,
  border: "1px solid #d8dee8",
  background: "#fff",
  fontSize: 16,
};

const buttonStyle = {
  marginTop: 20,
  width: "100%",
  padding: "14px 18px",
  borderRadius: 14,
  border: "none",
  background: "#111827",
  color: "#fff",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};

const errorStyle = {
  marginTop: 16,
  padding: "12px 14px",
  borderRadius: 12,
  background: "#fdecea",
  border: "1px solid #f0b6b1",
  color: "#b42318",
};