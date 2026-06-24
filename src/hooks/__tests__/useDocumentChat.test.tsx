import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDocumentChat } from "../useDocumentChat";
import { TestQueryProvider } from "@/test/test-utils";

vi.mock("@/services/documents", () => ({
  postDocumentChat: vi.fn(),
}));

import { postDocumentChat } from "@/services/documents";

describe("useDocumentChat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mutates and returns response", async () => {
    vi.mocked(postDocumentChat).mockResolvedValue({
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
    vi.mocked(postDocumentChat).mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useDocumentChat(), {
      wrapper: TestQueryProvider,
    });

    result.current.mutate({ documentId: "doc-1", query: "fail" });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
