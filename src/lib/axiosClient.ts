import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error: Error & { response?: { data?: { message?: string }; status?: number } }) => {
    error.message = error.response?.data?.message || error.message || "An unexpected error occurred";
    (error as Error & { status: number }).status = error.response?.status || 0;
    return Promise.reject(error);
  }
);

export default axiosClient;
