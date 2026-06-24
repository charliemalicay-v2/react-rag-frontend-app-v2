import axiosClient from "@/lib/axiosClient";
import type { HealthCheckResponse } from "./types";

export async function getHealthCheck(): Promise<HealthCheckResponse> {
  const { data } = await axiosClient.get<HealthCheckResponse>("/");
  return data;
}
