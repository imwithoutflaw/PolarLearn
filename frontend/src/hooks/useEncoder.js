import { useState } from "react";
import { runEncoder } from "../api/encoderApi.js";

export function useEncoder() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const encode = async (payload) => {
    try {
      setLoading(true);
      setError("");
      const data = await runEncoder(payload);
      setResult(data);
    } catch (err) {
      setError(err.message || "Encoder request failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    error,
    encode,
  };
}