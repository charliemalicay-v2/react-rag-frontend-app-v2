"use client";

import { useState } from "react";
import { useHealthCheck } from "@/hooks/useHealthCheck";
import { useAgentQuery } from "@/hooks/useAgentQuery";
import { useAgentStream } from "@/hooks/useAgentStream";
import { useDocumentChat } from "@/hooks/useDocumentChat";

function validateQuery(input: string): string | null {
  if (!input.trim()) return "Query cannot be empty.";
  if (input.trim().length < 2) return "Query must be at least 2 characters.";
  return null;
}

export function RagPanel() {
  const [query, setQuery] = useState("");
  const [agentResult, setAgentResult] = useState("");
  const [docId, setDocId] = useState("");
  const [docResult, setDocResult] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const {
    data: health,
    isPending: healthLoading,
    isError: healthError,
    error: healthErr,
  } = useHealthCheck();

  const agentQuery = useAgentQuery();
  const {
    startStream,
    stopStream,
    retry: retryStream,
    isStreaming,
    streamError,
  } = useAgentStream();
  const docChat = useDocumentChat();

  const handleAgentSubmit = async () => {
    const err = validateQuery(query);
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError(null);
    setAgentResult("");
    const result = await agentQuery.mutateAsync({ query });
    setAgentResult(result.answer);
  };

  const handleStreamStart = async () => {
    const err = validateQuery(query);
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError(null);
    await startStream({ query });
  };

  const handleDocSubmit = async () => {
    if (!docId.trim()) {
      setValidationError("Document ID is required.");
      return;
    }
    const err = validateQuery(query);
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError(null);
    setDocResult("");
    const result = await docChat.mutateAsync({ documentId: docId, query });
    setDocResult(result.answer);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-4">
      <h2 className="text-2xl font-bold">RAG Chat</h2>

      <section className="rounded-lg border p-4">
        <h3 className="mb-2 text-lg font-semibold">Health Check</h3>
        {healthLoading && <p className="text-gray-500">Checking...</p>}
        {healthError && (
          <p className="text-red-500">
            Error: {healthErr instanceof Error ? healthErr.message : "Unknown error"}
          </p>
        )}
        {health && (
          <p className="text-green-600">
            Status: {health.status} — {health.timestamp}
          </p>
        )}
      </section>

      <section className="space-y-4 rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Query</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (validationError) setValidationError(null);
            }}
            placeholder="Type your query..."
            className="flex-1 rounded-md border px-3 py-2 text-sm"
          />
        </div>
        {validationError && (
          <p className="text-sm text-red-500">{validationError}</p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAgentSubmit}
            disabled={agentQuery.isPending}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {agentQuery.isPending ? "Sending..." : "Send Query"}
          </button>
          <button
            onClick={handleStreamStart}
            disabled={isStreaming}
            className="rounded-md bg-blue-700 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {isStreaming ? "Streaming..." : "Stream"}
          </button>
          {isStreaming && (
            <button
              onClick={stopStream}
              className="rounded-md bg-red-600 px-4 py-2 text-sm text-white"
            >
              Stop
            </button>
          )}
          {streamError && (
            <button
              onClick={retryStream}
              className="rounded-md bg-yellow-600 px-4 py-2 text-sm text-white"
            >
              Retry Stream
            </button>
          )}
        </div>

        {agentQuery.isError && (
          <p className="text-red-500">
            Query error:{" "}
            {agentQuery.error instanceof Error
              ? agentQuery.error.message
              : "Request failed"}
          </p>
        )}
        {agentResult && (
          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-sm">{agentResult}</p>
          </div>
        )}

        {streamError && (
          <p className="text-red-500">Stream error: {streamError}</p>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={docId}
            onChange={(e) => setDocId(e.target.value)}
            placeholder="Document ID"
            className="w-48 rounded-md border px-3 py-2 text-sm"
          />
          <button
            onClick={handleDocSubmit}
            disabled={docChat.isPending}
            className="rounded-md bg-green-700 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {docChat.isPending ? "Sending..." : "Chat with Document"}
          </button>
        </div>

        {docChat.isError && (
          <p className="text-red-500">
            Document chat error:{" "}
            {docChat.error instanceof Error
              ? docChat.error.message
              : "Request failed"}
          </p>
        )}
        {docResult && (
          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-sm">{docResult}</p>
          </div>
        )}
      </section>
    </div>
  );
}
