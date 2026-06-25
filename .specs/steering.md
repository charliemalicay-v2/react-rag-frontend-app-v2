# Steering — Project Conventions

## Tech Stack
- **Runtime**: Node.js 20
- **Language**: TypeScript 5
- **Framework**: Next.js 16 + React 19 + Tailwind CSS + shadcn/ui
- **Font**: Inter (via next/font/google) for body and heading text
- **Database**: N/A
- **Testing**: Jest + ts-jest, Playwright (E2E)

## Commands
- **Build**: npm run build
- **Test**: npm test
- **Lint**: npm run lint
- **Type check**: npm run typecheck
- **Dev**: npm run dev
- **E2E**: npm run test:e2e

## Code Style
- Use `const` over `let`
- PascalCase for components, kebab-case for files
- Named exports preferred over default
- Hooks and lib files use camelCase (e.g., `useHealthCheck.tsx`, `axiosClient.ts`)

## Architecture
- Feature-based folder organization under `src/`
- App Router: routes in `src/app/`, components in `src/components/`
- Layered: `services/` → `hooks/` → `components/`
- Spec-driven development: specs in `.specs/<feature>/`
- Colocated tests in `__tests__/` directories

## Notes
- `public/` folder is gitignored
- Utilities in `src/lib/`
- TanStack React Query for server state
- MSW available for integration test mocks (not currently active in setup.ts)
- shadcn/ui CLI for component installation: `npx shadcn@latest add <component>`
- UI components live in `src/components/ui/` (installed via shadcn CLI)
- Use `cn()` utility from `src/lib/utils.ts` for conditional class merging (powered by `clsx` + `tailwind-merge`)
- Components use `class-variance-authority` for variant-based styling
