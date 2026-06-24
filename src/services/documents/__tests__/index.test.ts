import axiosClient from "@/lib/axiosClient";
import { postDocumentChat } from "..";
import type { DocumentChatRequest, DocumentChatResponse } from "../types";

jest.mock("@/lib/axiosClient", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe("postDocumentChat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    jest.mocked(axiosClient.post).mockResolvedValue({ data: mockResponse });

    const result = await postDocumentChat(payload);

    expect(axiosClient.post).toHaveBeenCalledWith(
      "/api/documents/chat",
      payload
    );
    expect(result).toEqual(mockResponse);
  });

  it("throws on error", async () => {
    jest.mocked(axiosClient.post).mockRejectedValue(new Error("API error"));

    await expect(
      postDocumentChat({ documentId: "doc-123", query: "fail" })
    ).rejects.toThrow("API error");
  });
});
