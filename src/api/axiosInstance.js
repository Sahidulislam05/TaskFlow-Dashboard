import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://task-api-eight-flax.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — token auto attach
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
