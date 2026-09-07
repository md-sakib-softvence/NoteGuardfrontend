# Architecture and Conventions Skill (Next.js)

Core architectural patterns, directory structure, and development conventions for the Next.js Basekit project.

---

## Core Philosophy

| Principle | Description |
|-----------|-------------|
| SSR & Client Boundary | Clear separation of Server and Client Components (`"use client"`) |
| Maintainability | Strict type safety and API types colocation |
| Performance | Optimized routing, font loading, and layout rendering |
| Consistency | Shared patterns, custom themes, and reusable modules |

---

## Directory Structure

```
src/
├── app/                 # Next.js App Router (pages, nested layouts, loading, errors)
├── components/          # Components
│   ├── common/          # Reusable complex common components (DynamicForm, DynamicTable, etc.)
│   ├── ui/              # Shadcn UI primitives (Button, Input, Popover, etc.)
│   └── layout/          # Layout shells (Header, Sidebar, Breadcrumbs)
├── hooks/               # Custom React hooks (useRedux, useDebounce, etc.)
├── lib/                 # Core utilities (utils.ts tailwind merge, nav-config)
├── store/               # Redux state management
│   ├── Api/             # RTK Query services (BaseApi, endpoints)
│   └── features/        # Redux slices (authSlice, etc.)
├── utils/               # General utility helpers (Zod generator, Loadable, etc.)
```

---

## Client Components Boundary
- By default, files inside `src/app/` are React Server Components (RSC).
- Use the `"use client";` directive at the top of any file that requires state (`useState`, `useEffect`), hooks (like Redux hooks, `useRouter` from `next/navigation`), or browser APIs.
- Keep Client Component boundaries as low as possible in the component tree to maximize server-side rendering benefits.

---

## API Colocation Rules

Every API service file inside `src/store/Api/` MUST be placed in its own feature folder and contain a corresponding types file:
```
src/store/Api/Employee/
├── employee.api.ts           # API endpoints
└── employee.type.ts          # Types (MUST exist)
```
