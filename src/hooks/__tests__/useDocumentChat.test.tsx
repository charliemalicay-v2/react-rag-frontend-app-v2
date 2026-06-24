import { renderHook, waitFor } from "@testing-library/react";
import { useDocumentChat } from "../useDocumentChat";
import { TestQueryProvider } from "@/test/test-utils";

jest.mock("@/services/documents", () => ({
  postDocumentChat: jest.fn(),
}));

import { postDocumentChat } from "@/services/documents";

describe("useDocumentChat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("mutates and returns response", async () => {
    jest.mocked(postDocumentChat).mockResolvedValue({
      answer: "document answer",
      relevantChunks: ["chunk1"],
    });

    const { result } = renderHook(() => useDocumentChat(), {
      wrapper: TestQueryProvider,
    });

    result.current.mutate({ documentId: "doc-1", query: "hello" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      answer: "document answer",
      relevantChunks: ["chunk1"],
    });
  });

  it("surfaces error on failure", async () => {
    jest.mocked(postDocumentChat).mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useDocumentChat(), {
      wrapper: TestQueryProvider,
    });

    result.current.mutate({ documentId: "doc-1", query: "fail" });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
