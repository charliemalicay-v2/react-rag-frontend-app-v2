"use client";

import { useState } from "react";
import { useHealthCheck } from "@/hooks/useHealthCheck";
import { useAgentQuery } from "@/hooks/useAgentQuery";
import { useAgentStream } from "@/hooks/useAgentStream";
import { useDocumentChat } from "@/hooks/useDocumentChat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    clearStream,
    isStreaming,
    streamError,
    streamedData,
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
    clearStream();
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
    <div className="mx-auto max-w-3xl p-4">
      <Card>
        <CardHeader>
          <CardTitle>RAG Chat</CardTitle>
        </CardHeader>
        <ScrollArea className="max-h-[80vh]">
          <CardContent className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Health Check</CardTitle>
              </CardHeader>
              <CardContent>
                {healthLoading && <p className="text-muted-foreground">Checking...</p>}
                {healthError && (
                  <p className="text-destructive">
                    Error: {healthErr instanceof Error ? healthErr.message : "Unknown error"}
                  </p>
                )}
                {health && (
                  <p className="text-green-600">
                    Status: {health.status} — {health.timestamp}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Query</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="Type your query..."
                  />
                </div>
                {validationError && (
                  <p className="text-sm text-destructive">{validationError}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleAgentSubmit}
                    disabled={agentQuery.isPending}
                  >
                    {agentQuery.isPending ? "Sending..." : "Send Query"}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleStreamStart}
                    disabled={isStreaming}
                  >
                    {isStreaming ? "Streaming..." : "Stream"}
                  </Button>
                  {isStreaming && (
                    <Button variant="destructive" onClick={stopStream}>
                      Stop
                    </Button>
                  )}
                  {streamError && (
                    <Button variant="outline" onClick={retryStream}>
                      Retry Stream
                    </Button>
                  )}
                </div>

                {agentQuery.isError && (
                  <p className="text-destructive">
                    Query error:{" "}
                    {agentQuery.error instanceof Error
                      ? agentQuery.error.message
                      : "Request failed"}
                  </p>
                )}
                {agentResult && (
                  <div className="rounded-md bg-muted p-3">
                    <p className="text-sm">{agentResult}</p>
                  </div>
                )}

                {streamedData && (
                  <div className="rounded-md bg-muted p-3">
                    <p className="text-sm">{streamedData}</p>
                  </div>
                )}

                {streamError && (
                  <p className="text-destructive">Stream error: {streamError}</p>
                )}

                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={docId}
                    onChange={(e) => setDocId(e.target.value)}
                    placeholder="Document ID"
                    className="w-48"
                  />
                  <Button
                    variant="secondary"
                    onClick={handleDocSubmit}
                    disabled={docChat.isPending}
                  >
                    {docChat.isPending ? "Sending..." : "Chat with Document"}
                  </Button>
                </div>

                {docChat.isError && (
                  <p className="text-destructive">
                    Document chat error:{" "}
                    {docChat.error instanceof Error
                      ? docChat.error.message
                      : "Request failed"}
                  </p>
                )}
                {docResult && (
                  <div className="rounded-md bg-muted p-3">
                    <p className="text-sm">{docResult}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}
