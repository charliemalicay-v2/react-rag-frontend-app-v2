import axiosClient from "@/lib/axiosClient";
import { postAgentQuery } from "..";
import type { AgentQueryRequest, AgentQueryResponse } from "../types";

jest.mock("@/lib/axiosClient", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe("postAgentQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("posts to /api/v1/agent and returns response", async () => {
    const payload: AgentQueryRequest = { query: "test query" };
    const mockResponse: AgentQueryResponse = {
      answer: "test answer",
      sources: ["doc1"],
    };
    jest.mocked(axiosClient.post).mockResolvedValue({ data: { results: mockResponse } });

    const result = await postAgentQuery(payload);

    expect(axiosClient.post).toHaveBeenCalledWith("/api/v1/agent", payload);
    expect(result).toEqual(mockResponse);
  });

  it("throws on error", async () => {
    jest.mocked(axiosClient.post).mockRejectedValue(new Error("API error"));

    await expect(postAgentQuery({ query: "fail" })).rejects.toThrow("API error");
  });
});
