"use client";

import { useHealthCheck } from "@/hooks/useHealthCheck";

export function HealthIndicator() {
  const { data, isPending, isError } = useHealthCheck();

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-block h-2.5 w-2.5 rounded-full ${
          isPending ? "bg-yellow-400" : isError ? "bg-red-500" : "bg-green-500"
        }`}
      />
      <span className="text-xs text-gray-500">
        {isPending ? "Checking..." : isError ? "API unavailable" : `API ${data?.status}`}
      </span>
    </div>
  );
}
