// src/services/api.js
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = `${BASE_URL}/api`;

export { API, BASE_URL };
export default API;