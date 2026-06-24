import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosClient from "@/lib/axiosClient";
import { postDocumentChat } from "..";
import type { DocumentChatRequest, DocumentChatResponse } from "../types";

vi.mock("@/lib/axiosClient", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("postDocumentChat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("posts to /api/documents/chat and returns response", async () => {
    const payload: DocumentChatRequest = {
      documentId: "doc-123",
      query: "test query",
    };
    const mockResponse: DocumentChatResponse = {
      answer: "document answer",
      relevantChunks: ["chunk1"],
    };
    vi.mocked(axiosClient.post).mockResolvedValue({ data: mockResponse });

    const result = await postDocumentChat(payload);

    expect(axiosClient.post).toHaveBeenCalledWith(
      "/api/documents/chat",
      payload
    );
    expect(result).toEqual(mockResponse);
  });

  it("throws on error", async () => {
    vi.mocked(axiosClient.post).mockRejectedValue(new Error("API error"));

    await expect(
      postDocumentChat({ documentId: "doc-123", query: "fail" })
    ).rejects.toThrow("API error");
  });
});
