import { renderHook, waitFor, act } from "@testing-library/react";
import { useAgentStream } from "../useAgentStream";

jest.mock("@/services/agent", () => ({
  postAgentStream: jest.fn(),
}));

import { postAgentStream } from "@/services/agent";

describe("useAgentStream", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("starts streaming and accumulates data", async () => {
    jest.mocked(postAgentStream).mockImplementation(
      async (_payload, onChunk) => {
        onChunk("hello ");
        onChunk("world");
      }
    );

    const { result } = renderHook(() => useAgentStream());

    await act(async () => {
      await result.current.startStream({ query: "test" });
    });

    expect(result.current.streamedData).toBe("hello world");
    expect(result.current.isStreaming).toBe(false);
    expect(result.current.streamError).toBeNull();
  });

  it("sets isStreaming true during stream, false after", async () => {
    let resolvePromise!: () => void;
    jest.mocked(postAgentStream).mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolvePromise = resolve;
        })
    );

    const { result } = renderHook(() => useAgentStream());

    act(() => {
      result.current.startStream({ query: "test" });
    });

    expect(result.current.isStreaming).toBe(true);

    await act(async () => {
      resolvePromise();
    });

    expect(result.current.isStreaming).toBe(false);
  });

  it("surfaces error on failure", async () => {
    jest.mocked(postAgentStream).mockRejectedValue(new Error("Stream failed"));

    const { result } = renderHook(() => useAgentStream());

    await act(async () => {
      await result.current.startStream({ query: "test" });
    });

    expect(result.current.streamError).toBe("Stream failed");
    expect(result.current.isStreaming).toBe(false);
  });

  it("stopStream aborts the stream", async () => {
    const abortSpy = jest.fn();
    jest.mocked(postAgentStream).mockImplementation(
      async (_payload, _onChunk, signal) => {
        signal?.addEventListener("abort", abortSpy);
      }
    );

    const { result } = renderHook(() => useAgentStream());

    await act(async () => {
      result.current.startStream({ query: "test" });
    });

    act(() => {
      result.current.stopStream();
    });

    expect(abortSpy).toHaveBeenCalled();
  });

  it("retry re-invokes with the last payload", async () => {
    const streamFn = jest.mocked(postAgentStream);
    streamFn.mockResolvedValue();

    const { result } = renderHook(() => useAgentStream());

    await act(async () => {
      await result.current.startStream({ query: "retry-test" });
    });

    streamFn.mockClear();

    await act(async () => {
      await result.current.retry();
    });

    expect(streamFn).toHaveBeenCalledWith(
      { query: "retry-test" },
      expect.any(Function),
      expect.any(AbortSignal)
    );
  });

  it("clearStream resets streamedData and streamError", async () => {
    jest.mocked(postAgentStream).mockRejectedValue(new Error("Temp error"));

    const { result } = renderHook(() => useAgentStream());

    await act(async () => {
      await result.current.startStream({ query: "test" });
    });

    expect(result.current.streamError).toBe("Temp error");

    act(() => {
      result.current.clearStream();
    });

    expect(result.current.streamedData).toBe("");
    expect(result.current.streamError).toBeNull();
  });
});
