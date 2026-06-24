import axiosClient from "@/lib/axiosClient";
import type { AgentQueryRequest, AgentQueryResponse, AgentApiResponse } from "./types";

export async function postAgentQuery(payload: AgentQueryRequest): Promise<AgentQueryResponse> {
  const { data } = await axiosClient.post<AgentApiResponse>("/api/v1/agent", payload);
  return data.results;
}

export async function postAgentStream(
  payload: AgentQueryRequest,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const url = `${axiosClient.defaults.baseURL}/api/v1/agent/stream`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Stream request failed: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const chunk = line.slice(6);
        if (chunk === "[DONE]") return;
        try {
          const parsed = JSON.parse(chunk);
          if (parsed.type === "token" && typeof parsed.content === "string") {
            onChunk(parsed.content.replace(/\\n/g, "\n"));
          } else {
            onChunk(chunk.replace(/\\n/g, "\n"));
          }
        } catch {
          onChunk(chunk.replace(/\\n/g, "\n"));
        }
      }
    }
  }
}
