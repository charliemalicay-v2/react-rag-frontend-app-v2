# Requirements: Integrate RAG React APIs

## Overview

Integrating the RAG React API to this frontend using TanStack React Query (`@tanstack/react-query`). Exposes health check, agent query, streaming SSE, and document chat endpoints to users via `useQuery` and `useMutation` hooks.

## Actors

- External API (RAG React backend)

## Functional Requirements

### Normal Flow

- **FR-001**: WHEN the application initializes THE SYSTEM SHALL perform a health check against `GET /` using `useQuery` with an appropriate query key and stale time
- **FR-002**: WHEN the user submits a query THE SYSTEM SHALL POST to `/api/v1/agent` via `useMutation` and display the response on success
- **FR-003**: WHEN the user requests a streaming response THE SYSTEM SHALL POST to `/api/v1/agent/stream` and consume Server-Sent Events, updating the `useQuery` cache incrementally as chunks arrive
- **FR-004**: WHEN the user sends a document-related query THE SYSTEM SHALL POST to `/api/documents/chat` via `useMutation` and display the results

### Error / Edge Cases

- **FR-005**: GIVEN the API is unreachable WHEN any `useQuery` or `useMutation` is triggered THE SYSTEM SHALL surface the `error` object from React Query and display a user-friendly message
- **FR-006**: GIVEN the query input is invalid WHEN the user submits THE SYSTEM SHALL validate locally before calling `mutate` and show error feedback without making a request
- **FR-007**: WHILE streaming from the SSE endpoint WHEN the connection drops THE SYSTEM SHALL use React Query's `queryClient.setQueryData` to append partial results and allow manual retry via `refetch`
- **FR-008**: GIVEN a request WHEN no response is received within the `retry` / `staleTime` configuration THE SYSTEM SHALL respect the query's timeout and notify the user via the `isError` state

## Non-Functional Requirements

- **NFR-001**: All queries SHALL define explicit `queryKey` arrays, configure appropriate `staleTime` and `gcTime`, and show loading indicators via `isPending` / `isLoading`

## Out of Scope

- Authentication and user management
- Document upload functionality
- CI/CD and deployment
