import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useHealthCheck } from "../useHealthCheck";
import { TestQueryProvider } from "@/test/test-utils";

vi.mock("@/services/health", () => ({
  getHealthCheck: vi.fn(),
}));

import { getHealthCheck } from "@/services/health";

describe("useHealthCheck", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns health data on success", async () => {
    vi.mocked(getHealthCheck).mockResolvedValue({
      status: "ok",
      timestamp: "2026-06-24T00:00:00Z",
    });

    const { result } = renderHook(() => useHealthCheck(), {
      wrapper: TestQueryProvider,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      status: "ok",
      timestamp: "2026-06-24T00:00:00Z",
    });
  });

  it("surfaces error on failure", async () => {
    vi.mocked(getHealthCheck).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useHealthCheck(), {
      wrapper: TestQueryProvider,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
