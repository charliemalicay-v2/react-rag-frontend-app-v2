"use client";

import { useHealthCheck } from "@/hooks/useHealthCheck";
import { Badge } from "@/components/ui/badge";

export function HealthIndicator() {
  const { data, isPending, isError } = useHealthCheck();

  return (
    <Badge
      variant={
        isPending ? "secondary" : isError ? "destructive" : "default"
      }
    >
      {isPending ? "Checking..." : isError ? "API unavailable" : `API ${data?.status}`}
    </Badge>
  );
}
