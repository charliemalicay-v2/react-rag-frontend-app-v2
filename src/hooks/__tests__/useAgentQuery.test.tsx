import { renderHook, waitFor } from "@testing-library/react";
import { useAgentQuery } from "../useAgentQuery";
import { TestQueryProvider } from "@/test/test-utils";

jest.mock("@/services/agent", () => ({
  postAgentQuery: jest.fn(),
}));

import { postAgentQuery } from "@/services/agent";

describe("useAgentQuery", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("mutates and returns response", async () => {
    jest.mocked(postAgentQuery).mockResolvedValue({
      answer: "test answer",
      sources: ["doc1"],
    });

    const { result } = renderHook(() => useAgentQuery(), {
      wrapper: TestQueryProvider,
    });

    result.current.mutate({ query: "hello" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      answer: "test answer",
      sources: ["doc1"],
    });
  });

  it("surfaces error on failure", async () => {
    jest.mocked(postAgentQuery).mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() => useAgentQuery(), {
      wrapper: TestQueryProvider,
    });

    result.current.mutate({ query: "fail" });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
