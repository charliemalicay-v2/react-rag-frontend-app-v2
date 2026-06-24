export interface AgentQueryRequest {
  query: string;
}

export interface AgentQueryResponse {
  answer: string;
  sources?: string[];
}

export interface AgentApiResponse {
  query: string;
  results: AgentQueryResponse;
}
