"use client";

type ChatMode = "nostream" | "stream";

interface ChatModeSelectorProps {
  value: ChatMode;
  onChange: (mode: ChatMode) => void;
}

export function ChatModeSelector({ value, onChange }: ChatModeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Mode:</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ChatMode)}
        className="rounded-md border px-3 py-2 text-sm"
      >
        <option value="nostream">No Stream</option>
        <option value="stream">Stream</option>
      </select>
    </div>
  );
}
