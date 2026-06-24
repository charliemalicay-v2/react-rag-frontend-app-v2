"use client";

export interface Message {
  id: string;
  role: "user" | "bot" | "error";
  content: string;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  emptyMessage?: string;
}

export function MessageList({ messages, isLoading, emptyMessage = "Send a message to start the conversation." }: MessageListProps) {
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
        <p className="text-sm text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`rounded-lg p-4 text-sm ${
            msg.role === "user"
              ? "ml-12 bg-gray-100"
              : msg.role === "error"
                ? "border border-red-200 bg-red-50 text-red-700"
                : "mr-12 bg-blue-50"
          }`}
        >
          <p className="whitespace-pre-wrap">{msg.content}</p>
        </div>
      ))}
      {isLoading && (
        <div className="mr-12 animate-pulse rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-gray-500">Thinking...</p>
        </div>
      )}
    </div>
  );
}
