"use client";

import { useState } from "react";
import { useDocumentChat } from "@/hooks/useDocumentChat";

export function DocumentChatInput() {
  const [docId, setDocId] = useState("");
  const [query, setQuery] = useState("");
  const docChat = useDocumentChat();

  const handleSubmit = async () => {
    if (!docId.trim() || !query.trim()) return;
    await docChat.mutateAsync({ documentId: docId.trim(), query: query.trim() });
  };

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <h4 className="text-sm font-semibold text-gray-700">Chat with Document</h4>
      <input
        type="text"
        value={docId}
        onChange={(e) => setDocId(e.target.value)}
        placeholder="Document ID"
        disabled={docChat.isPending}
        className="w-full rounded-md border px-3 py-2 text-sm disabled:opacity-50"
      />
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about the document..."
          disabled={docChat.isPending}
          className="flex-1 rounded-md border px-3 py-2 text-sm disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={docChat.isPending || !docId.trim() || !query.trim()}
          className="rounded-md bg-green-700 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {docChat.isPending ? "Sending..." : "Ask"}
        </button>
      </div>
      {docChat.isError && (
        <p className="text-sm text-red-500">
          {docChat.error instanceof Error ? docChat.error.message : "Request failed"}
        </p>
      )}
      {docChat.data && (
        <div className="rounded-md bg-green-50 p-3">
          <p className="text-sm">{docChat.data.answer}</p>
        </div>
      )}
    </div>
  );
}
