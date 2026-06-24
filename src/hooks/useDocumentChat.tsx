import { useMutation } from "@tanstack/react-query";
import { postDocumentChat } from "@/services/documents";
import type { DocumentChatRequest } from "@/services/documents/types";

export function useDocumentChat() {
  return useMutation({
    mutationFn: (payload: DocumentChatRequest) => postDocumentChat(payload),
  });
}
