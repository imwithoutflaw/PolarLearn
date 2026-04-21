import { useCallback, useState } from "react";
import { runDecoder } from "../api/decoderApi.js";

export function useDecoder() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const decode = useCallback(async (payload) => {
    try {
      setLoading(true);
      setError("");
      const data = await runDecoder(payload);
      setResult(data);
    } catch (err) {
      setError(
        err?.message ||
          (typeof err === "string" ? err : "Decoder request failed")
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
    decode,
  };
}