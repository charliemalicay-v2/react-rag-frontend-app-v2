import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "@/lib/axiosClient";
import { getHealthCheck } from "..";
import type { HealthCheckResponse } from "../types";

vi.mock("@/lib/axiosClient", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("getHealthCheck", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns health check response on success", async () => {
    const mockResponse: HealthCheckResponse = {
      status: "ok",
      timestamp: "2026-06-24T00:00:00Z",
    };
    vi.mocked(axiosClient.get).mockResolvedValue({ data: mockResponse });

    const result = await getHealthCheck();

    expect(axiosClient.get).toHaveBeenCalledWith("/");
    expect(result).toEqual(mockResponse);
  });

  it("throws on network error", async () => {
    vi.mocked(axiosClient.get).mockRejectedValue(new Error("Network error"));

    await expect(getHealthCheck()).rejects.toThrow("Network error");
  });
});
