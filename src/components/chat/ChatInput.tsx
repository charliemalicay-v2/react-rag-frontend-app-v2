"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (query: string) => void;
  disabled: boolean;
  placeholder?: string;
}

function validateQuery(input: string): string | null {
  if (!input.trim()) return "Query cannot be empty.";
  if (input.trim().length < 2) return "Query must be at least 2 characters.";
  return null;
}

export function ChatInput({ onSend, disabled, placeholder = "Type your message..." }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const err = validateQuery(input);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 rounded-md border px-3 py-2 text-sm disabled:opacity-50"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !input.trim()}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
