import { useMutation } from "@tanstack/react-query";
import { postAgentQuery } from "@/services/agent";
import type { AgentQueryRequest } from "@/services/agent/types";

export function useAgentQuery() {
  return useMutation({
    mutationFn: (payload: AgentQueryRequest) => postAgentQuery(payload),
  });
}
