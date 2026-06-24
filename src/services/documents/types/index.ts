export interface DocumentChatRequest {
  documentId: string;
  query: string;
}

export interface DocumentChatResponse {
  answer: string;
  relevantChunks?: string[];
}
