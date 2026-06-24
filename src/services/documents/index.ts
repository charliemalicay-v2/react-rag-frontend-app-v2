import axiosClient from "@/lib/axiosClient";
import type { DocumentChatRequest, DocumentChatResponse } from "./types";

export async function postDocumentChat(
  payload: DocumentChatRequest
): Promise<DocumentChatResponse> {
  const { data } = await axiosClient.post<DocumentChatResponse>(
    "/api/documents/chat",
    payload
  );
  return data;
}
