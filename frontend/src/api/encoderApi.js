export async function runEncoder(payload) {
  const response = await fetch("http://127.0.0.1:8000/api/encoder/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const detail =
      typeof data?.detail === "string"
        ? data.detail
        : Array.isArray(data?.detail)
          ? JSON.stringify(data.detail)
          : "Encoder request failed";

    throw new Error(detail);
  }

  return data;
}