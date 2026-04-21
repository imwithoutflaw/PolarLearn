import { useState } from "react";
import { constructMask } from "../api/maskApi.js";

export function useMask() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buildMask = async (payload) => {
    try {
      setLoading(true);
      setError("");
      const data = await constructMask(payload);
      setResult(data);
    } catch (err) {
      setError(err.message || "Mask request failed");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    result,
    loading,
    error,
    buildMask,
  };
}