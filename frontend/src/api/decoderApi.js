import { apiRequest } from "./client";

export async function runDecoder(payload) {
  return apiRequest("/api/decoder/sc-run", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}