"use client";

import { Skeleton } from "@/components/ui/skeleton";

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
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
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
              ? "ml-12 bg-muted"
              : msg.role === "error"
                ? "border border-destructive/20 bg-destructive/10 text-destructive"
                : "mr-12 bg-muted"
          }`}
        >
          <p className="whitespace-pre-wrap">{msg.content}</p>
        </div>
      ))}
      {isLoading && (
        <div className="mr-12 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}
    </div>
  );
}
