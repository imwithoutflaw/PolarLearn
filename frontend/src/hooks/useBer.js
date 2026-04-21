import { useState } from "react";
import { compareBer } from "../api/berApi.js";

export function useBer() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runComparison = async (payload) => {
    try {
      setLoading(true);
      setError("");
      const data = await compareBer(payload);
      setResult(data);
    } catch (err) {
      setError(
        err?.message ||
          (typeof err === "string" ? err : "BER comparison request failed")
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    error,
    runComparison,
  };
}