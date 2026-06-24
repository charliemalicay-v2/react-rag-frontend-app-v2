export interface AgentQueryRequest {
  query: string;
}

export interface AgentQueryResponse {
  answer: string;
  sources?: string[];
}
