# Tasks: Refactor Components to shadcn/ui

## Foundation

- [x] TASK-001: Initialize shadcn/ui CLI and create `components.json` config (ref: FR-001)
- [x] TASK-024: Replace Geist with Inter font via `next/font/google` and update CSS variables (ref: FR-009)
- [x] TASK-002: Create `cn()` utility in `src/lib/utils.ts` with `clsx` + `tailwind-merge` (ref: FR-001)
- [x] TASK-003: Install `class-variance-authority`, `clsx`, `tailwind-merge` dependencies (ref: FR-001)
- [x] TASK-004: Install shadcn components: Button, Card, Badge, Input, Select, Alert, Skeleton, Accordion, ScrollArea (ref: FR-001)

## Core Logic — Landing Page Components

- [x] TASK-005: Refactor `src/components/hero.tsx` — replace `<a>` with `Button` (ref: FR-001, FR-002, FR-003)
- [x] TASK-006: Refactor `src/components/features.tsx` — replace manual card divs with `Card` + `CardHeader` + `CardContent` (ref: FR-001)
- [x] TASK-007: Refactor `src/components/pricing.tsx` — replace manual card divs with `Card` + `CardContent` (ref: FR-001)
- [x] TASK-008: Refactor `src/components/stats.tsx` — replace manual card divs with `Card` (ref: FR-001)
- [x] TASK-009: Refactor `src/components/testimonials.tsx` — replace manual card divs with `Card` (ref: FR-001)
- [x] TASK-010: Refactor `src/components/contact.tsx` — replace form elements with `Input` and `Button` (ref: FR-001, FR-002, FR-003)
- [x] TASK-011: Refactor `src/components/faq.tsx` — replace manual accordion divs with `Accordion` (ref: FR-001, FR-002, FR-003)

## Core Logic — Chat Components

- [x] TASK-012: Refactor `src/components/chat/HealthIndicator.tsx` — replace manual status div with `Badge` (ref: FR-001)
- [x] TASK-013: Refactor `src/components/chat/ChatInput.tsx` — replace raw `<input>` with shadcn `Input` (ref: FR-001, FR-002, FR-003)
- [x] TASK-014: Refactor `src/components/chat/ChatModeSelector.tsx` — replace native `<select>` with shadcn `Select` (ref: FR-001, FR-002, FR-003)
- [x] TASK-015: Refactor `src/components/chat/ChatInterface.tsx` — replace manual error div with `Alert` (ref: FR-001, FR-008)
- [x] TASK-016: Refactor `src/components/chat/MessageList.tsx` — replace manual `animate-pulse` div with `Skeleton` (ref: FR-001)
- [x] TASK-017: Refactor `src/components/RagPanel.tsx` — replace manual panel with `Card` + `ScrollArea` (ref: FR-001)

## Integration

- [x] TASK-018: Update CSS theme tokens in `globals.css` for shadcn compatibility (ref: FR-008)
- [x] TASK-019: Run `npm test` and fix any test failures from refactored components (ref: NFR-005)
- [x] TASK-020: Run `npm run build` and fix any TypeScript/compile errors (ref: FR-005, FR-006)

## Polish

- [x] TASK-021: Run `npm run test:e2e` to verify all E2E tests pass (ref: NFR-005)
- [x] TASK-022: Verify keyboard navigation across all updated components (ref: FR-002)
- [x] TASK-023: Verify screen reader behavior for updated components (ref: FR-003)

---

**Legend**: `[ ]` = pending, `[x]` = completed
