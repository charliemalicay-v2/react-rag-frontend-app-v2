import { useRef, useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { postAgentStream } from "@/services/agent";
import type { AgentQueryRequest, AgentQueryResponse } from "@/services/agent/types";

export function useAgentStream() {
  const queryClient = useQueryClient();
  const abortRef = useRef<AbortController | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const lastPayloadRef = useRef<AgentQueryRequest | null>(null);

  const startStream = useCallback(
    async (payload: AgentQueryRequest) => {
      setIsStreaming(true);
      setStreamError(null);
      lastPayloadRef.current = payload;
      abortRef.current = new AbortController();

      const accumulated: string[] = [];

      try {
        await postAgentStream(
          payload,
          (chunk) => {
            accumulated.push(chunk);
            queryClient.setQueryData<AgentQueryResponse>(["agent", "stream"], {
              answer: accumulated.join(""),
            });
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
    [queryClient]
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

  return { startStream, stopStream, retry, isStreaming, streamError };
}
