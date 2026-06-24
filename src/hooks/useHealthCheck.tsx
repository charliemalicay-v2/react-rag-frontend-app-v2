import { useQuery } from "@tanstack/react-query";
import { getHealthCheck } from "@/services/health";

export function useHealthCheck() {
  return useQuery({
    queryKey: ["health"],
    queryFn: getHealthCheck,
    staleTime: 5 * 60 * 1000,
  });
}
