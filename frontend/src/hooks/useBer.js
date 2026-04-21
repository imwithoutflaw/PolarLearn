import { useState, useCallback } from "react";
import { runBerSimulation } from "../api/berApi.js";

export function useBer() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runComparison = useCallback(async (payload) => {
    try {
      setLoading(true);
      setError("");

      const data = await runBerSimulation(payload);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(
        err?.message ||
          (typeof err === "string" ? err : "BER simulation failed")
      );
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    result,
    loading,
    error,
    runComparison,
  };
}