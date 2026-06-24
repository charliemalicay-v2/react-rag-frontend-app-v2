import axiosClient from "@/lib/axiosClient";
import type { AgentQueryRequest, AgentQueryResponse } from "./types";

export async function postAgentQuery(payload: AgentQueryRequest): Promise<AgentQueryResponse> {
  const { data } = await axiosClient.post<AgentQueryResponse>("/api/v1/agent", payload);
  return data;
}

export function postAgentStream(
  payload: AgentQueryRequest,
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<void> {
  return new Promise((resolve, reject) => {
    const eventSource = new EventSource(
      `${axiosClient.defaults.baseURL}/api/v1/agent/stream`
    );

    eventSource.onmessage = (event) => {
      onChunk(event.data);
    };

    eventSource.onerror = () => {
      eventSource.close();
      reject(new Error("SSE connection dropped"));
    };

    if (signal) {
      signal.addEventListener("abort", () => {
        eventSource.close();
        resolve();
      });
    }
  });
}
