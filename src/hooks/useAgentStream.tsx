import { useRef, useState, useCallback, useEffect } from "react";
import { postAgentStream } from "@/services/agent";
import type { AgentQueryRequest } from "@/services/agent/types";

export function useAgentStream() {
  const abortRef = useRef<AbortController | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [streamedData, setStreamedData] = useState("");
  const lastPayloadRef = useRef<AgentQueryRequest | null>(null);

  const startStream = useCallback(
    async (payload: AgentQueryRequest) => {
      setIsStreaming(true);
      setStreamError(null);
      setStreamedData("");
      lastPayloadRef.current = payload;
      abortRef.current = new AbortController();

      try {
        await postAgentStream(
          payload,
          (chunk) => {
            setStreamedData((prev) => prev + chunk);
          },
          abortRef.current.signal
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : "Stream error";
        setStreamError(message);
      } finally {
        setIsStreaming(false);
      }
    },
    []
  );

  const retry = useCallback(async () => {
    if (lastPayloadRef.current) {
      await startStream(lastPayloadRef.current);
    }
  }, [startStream]);

  const stopStream = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);

  const clearStream = useCallback(() => {
    setStreamedData("");
    setStreamError(null);
  }, []);

  return { startStream, stopStream, retry, clearStream, isStreaming, streamError, streamedData };
}
