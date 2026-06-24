"use client";

import { useState, useCallback } from "react";
import { useAgentQuery } from "@/hooks/useAgentQuery";
import { useAgentStream } from "@/hooks/useAgentStream";
import { ChatModeSelector } from "./ChatModeSelector";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import { HealthIndicator } from "./HealthIndicator";
import { DocumentChatInput } from "./DocumentChatInput";
import type { Message } from "./MessageList";

let nextId = 1;

export function ChatInterface() {
  const [mode, setMode] = useState<"nostream" | "stream">("nostream");
  const [messages, setMessages] = useState<Message[]>([]);

  const agentQuery = useAgentQuery();
  const {
    startStream,
    stopStream,
    retry: retryStream,
    isStreaming,
    streamError,
    streamedData,
  } = useAgentStream();

  const addMessage = useCallback((role: Message["role"], content: string) => {
    setMessages((prev) => [...prev, { id: String(nextId++), role, content }]);
  }, []);

  const handleSend = useCallback(
    async (query: string) => {
      addMessage("user", query);

      if (mode === "nostream") {
        try {
          const result = await agentQuery.mutateAsync({ query });
          addMessage("bot", result.answer);
        } catch (err) {
          console.error("Agent query error:", err);
          const message = err instanceof Error ? err.message : "Failed to get response. Please try again.";
          addMessage("error", message);
        }
      } else {
        await startStream({ query });
      }
    },
    [mode, agentQuery, startStream, addMessage]
  );

  const handleStop = useCallback(() => {
    stopStream();
  }, [stopStream]);

  const handleRetry = useCallback(() => {
    retryStream();
  }, [retryStream]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ChatModeSelector value={mode} onChange={setMode} />
        <HealthIndicator />
      </div>

      <div className="max-h-[60vh] min-h-[300px] overflow-y-auto rounded-lg border p-4">
        <MessageList messages={messages} isLoading={agentQuery.isPending || isStreaming} />

        {streamedData && !isStreaming && (
          <div className="mr-12 mt-4 rounded-lg bg-blue-50 p-4">
            <p className="text-sm whitespace-pre-wrap">{streamedData}</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <ChatInput onSend={handleSend} disabled={agentQuery.isPending || isStreaming} />
        {isStreaming && (
          <button
            onClick={handleStop}
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white"
          >
            Stop Streaming
          </button>
        )}
        {streamError && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-red-500">Stream error: {streamError}</p>
            <button
              onClick={handleRetry}
              className="rounded-md bg-yellow-600 px-3 py-1 text-sm text-white"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <DocumentChatInput />
    </div>
  );
}
