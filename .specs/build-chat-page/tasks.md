# Tasks: Build Chat Page

## Foundation

- [x] TASK-001: Create `src/app/chat/page.tsx` route entry point (ref: FR-001)
- [x] TASK-002: Create `src/components/pages/Chat.tsx` page component composing Header, ChatInterface, Footer (ref: FR-001)

## Core Components

- [x] TASK-003: Create `src/components/chat/ChatModeSelector.tsx` — dropdown/toggle for "No Stream" / "Stream" mode (ref: FR-002, FR-003)
- [x] TASK-004: Create `src/components/chat/ChatInput.tsx` — text input with send button and query validation (ref: FR-002, FR-003)
- [x] TASK-005: Create `src/components/chat/MessageList.tsx` — scrollable message list with loading, error, and empty states (ref: FR-006, FR-007, FR-008)
- [x] TASK-006: Create `src/components/chat/HealthIndicator.tsx` — status pill using `useHealthCheck` (ref: FR-005)
- [x] TASK-007: Create `src/components/chat/DocumentChatInput.tsx` — document ID input + query using `useDocumentChat` (ref: FR-004)
- [x] TASK-008: Create `src/components/chat/ChatInterface.tsx` — orchestrator component owning chat state, integrating all hooks and sub-components (ref: FR-002, FR-003, FR-004, FR-005)

## Integration

- [x] TASK-009: Integrate all hooks (`useHealthCheck`, `useAgentQuery`, `useAgentStream`, `useDocumentChat`) into `ChatInterface` (ref: FR-002, FR-003, FR-004, FR-005)
- [x] TASK-010: Add navigation card on home page (`src/app/page.tsx`) linking to `/chat` (ref: FR-001)

## Polish

- [x] TASK-011: Add loading indicators and disabled states while requests are pending (ref: NFR-001)
- [x] TASK-012: Add inline error messages for API, network, and response errors (ref: FR-006, FR-007, FR-008)
- [x] TASK-013: Verify `npm run build` compiles successfully
- [x] TASK-014: Verify `npm test` passes

---

**Legend**: `[ ]` = pending, `[x]` = completed
