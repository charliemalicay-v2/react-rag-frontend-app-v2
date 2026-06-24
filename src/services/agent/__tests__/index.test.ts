import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "@/lib/axiosClient";
import { postAgentQuery } from "..";
import type { AgentQueryRequest, AgentQueryResponse } from "../types";

vi.mock("@/lib/axiosClient", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("postAgentQuery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("posts to /api/v1/agent and returns response", async () => {
    const payload: AgentQueryRequest = { query: "test query" };
    const mockResponse: AgentQueryResponse = {
      answer: "test answer",
      sources: ["doc1"],
    };
    vi.mocked(axiosClient.post).mockResolvedValue({ data: mockResponse });

    const result = await postAgentQuery(payload);

    expect(axiosClient.post).toHaveBeenCalledWith("/api/v1/agent", payload);
    expect(result).toEqual(mockResponse);
  });

  it("throws on error", async () => {
    vi.mocked(axiosClient.post).mockRejectedValue(new Error("API error"));

    await expect(postAgentQuery({ query: "fail" })).rejects.toThrow("API error");
  });
});
