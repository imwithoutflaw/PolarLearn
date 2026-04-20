import { useState } from "react";

export function useDecoder() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const decode = async (payload) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://127.0.0.1:8000/api/decoder/sc-run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail || "Decoder request failed");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Decoder request failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    error,
    decode,
  };
}