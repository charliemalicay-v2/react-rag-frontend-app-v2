# Tasks: Integrate RAG React APIs

## Foundation

- [x] TASK-001: Create shared Axios instance in `src/lib/axiosClient.ts` with base URL from `NEXT_PUBLIC_API_BASE_URL` and error interceptors (ref: FR-001, FR-005, FR-008)
- [x] TASK-002: Create QueryClient singleton in `src/lib/queryClient.ts` with `staleTime`, `gcTime`, `retry` defaults (ref: FR-001, FR-008)
- [x] TASK-003: Wrap root layout with `QueryClientProvider` in `src/app/layout.tsx` (ref: FR-001)
- [x] TASK-004: Define TypeScript interfaces: `HealthCheckResponse`, `AgentQueryRequest`, `AgentQueryResponse`, `DocumentChatRequest`, `DocumentChatResponse` in respective `services/*/types/index.ts` files (ref: FR-001, FR-002, FR-003, FR-004)

## Core Logic

- [x] TASK-005: Implement health check service (`services/health/index.ts`) and hook (`hooks/useHealthCheck.tsx`) using `useQuery` (ref: FR-001)
- [x] TASK-006: Implement agent query service (`services/agent/index.ts`) and hook (`hooks/useAgentQuery.tsx`) using `useMutation` (ref: FR-002)
- [x] TASK-007: Implement SSE streaming service and hook (`hooks/useAgentStream.tsx`) for `/api/v1/agent/stream` with incremental `queryClient.setQueryData` updates (ref: FR-003, FR-007)
- [x] TASK-008: Implement document chat service (`services/documents/index.ts`) and hook (`hooks/useDocumentChat.tsx`) using `useMutation` (ref: FR-004)

## Integration

- [x] TASK-009: Connect all hooks to UI components, surfacing `error`/`isError` states with user-friendly messages (ref: FR-005)
- [x] TASK-010: Add local input validation before mutation calls, preventing invalid submissions (ref: FR-006)
- [x] TASK-011: Implement SSE reconnection / retry via `refetch` on connection drop (ref: FR-007)
- [x] TASK-012: Configure per-query `staleTime`, `gcTime`, `retry` to handle timeouts and surface `isError` state (ref: FR-008)

## Polish

- [x] TASK-013: Add loading indicators using `isPending` / `isLoading` across all hooks (ref: NFR-001)
- [x] TASK-014: Write unit tests for all service functions
- [x] TASK-015: Write component tests for all hooks

---

**Legend**: `[ ]` = pending, `[x]` = completed
