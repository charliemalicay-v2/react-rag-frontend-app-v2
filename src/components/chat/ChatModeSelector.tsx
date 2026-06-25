"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type ChatMode = "nostream" | "stream";

interface ChatModeSelectorProps {
  value: ChatMode;
  onChange: (mode: ChatMode) => void;
}

export function ChatModeSelector({ value, onChange }: ChatModeSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-foreground">Mode:</label>
      <Select value={value} onValueChange={(v) => onChange(v as ChatMode)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nostream">No Stream</SelectItem>
          <SelectItem value="stream">Stream</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
