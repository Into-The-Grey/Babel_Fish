import axios from "axios";

const BASE_URL = "http://localhost:8000";

export async function fetchPayloads(params = {}) {
  const res = await axios.get(`${BASE_URL}/payloads`, { params });
  return res.data;
}

export async function fetchPayload(id: number) {
  const res = await axios.get(`${BASE_URL}/payloads/${id}`);
  return res.data;
}

export async function createPayload(
  payload: Record<string, unknown>, // changed from 'any'
  username?: string,
  password?: string
) {
  const res = await axios.post(
    `${BASE_URL}/payloads`,
    payload,
    username && password
      ? {
          auth: { username, password },
        }
      : {}
  );
  return res.data;
}

export async function downloadPayload(id: number) {
  const res = await axios.get(`${BASE_URL}/payloads/${id}/download`, { responseType: "blob" });
  return res.data;
}

export async function updatePayload(
  id: number,
  payload: Record<string, unknown>,
  username?: string,
  password?: string
) {
  const res = await axios.put(
    `${BASE_URL}/payloads/${id}`,
    payload,
    username && password
      ? {
        auth: { username, password },
      }
      : {}
  );
  return res.data;
}
export async function exportPayloads() {
  const res = await axios.get(`${BASE_URL}/payloads/export`, { responseType: "blob" });
  return res.data; // Blob
}

export async function importPayloads(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${BASE_URL}/payloads/import`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function restorePayloads() {
  const res = await axios.post(`${BASE_URL}/payloads/restore`);
  return res.data;
}
// Detect payload format
export async function detectPayloadFormat(code: string) {
  const res = await axios.post(`${BASE_URL}/payloads/detect-format`, { code });
  return res.data; // e.g. {format: "BadBeetle"}
}

// List possible conversions for a format
export async function listPayloadConversions(format: string) {
  const res = await axios.get(`${BASE_URL}/payloads/conversions`, { params: { format } });
  return res.data; // e.g. ["RubberDucky", "Digispark"]
}

// Convert code to another format
export async function convertPayload(code: string, from: string, to: string) {
  const res = await axios.post(`${BASE_URL}/payloads/convert`, { code, from, to });
  return res.data; // { convertedCode: "..." }
}
// Add more as needed...
