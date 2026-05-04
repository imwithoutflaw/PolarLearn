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

      setResult({
        ...data,
        original_bits: payload.original_bits || [],
        u_vector: payload.u_vector || [],
        codeword: payload.codeword || [],
        input_llr: payload.llr || [],
      });

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