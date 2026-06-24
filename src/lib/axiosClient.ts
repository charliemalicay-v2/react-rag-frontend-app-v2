import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = {
      message: error.response?.data?.message || error.message || "An unexpected error occurred",
      status: error.response?.status || 0,
    };
    return Promise.reject(normalized);
  }
);

export default axiosClient;
