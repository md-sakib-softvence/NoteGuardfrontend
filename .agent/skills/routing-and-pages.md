# Routing and Pages Skill (Next.js App Router)

Instructions for managing routes, nested layouts, and creating new pages in the Next.js App Router system.

---

## Key Locations

| Resource | Path |
|----------|------|
| Root Layout | `src/app/layout.tsx` |
| Landing Page | `src/app/page.tsx` |
| Admin Layout | `src/app/admin/layout.tsx` |
| Admin Dashboard Page | `src/app/admin/page.tsx` |
| User Layout | `src/app/user/layout.tsx` |
| User Dashboard Page | `src/app/user/page.tsx` |
| Navigation Config | `src/lib/nav-config.ts` |

---

## App Router Routing System

This template uses the **Next.js App Router** with nested folder structures:

```
src/app/
├── layout.tsx                 # Root layout (Provider wrapping, body, font loading)
├── page.tsx                   # Public Landing Page
├── admin/
│   ├── layout.tsx             # Admin shell layout (collapsible sidebar, header)
│   ├── page.tsx               # Admin overview home page
│   ├── table-demo/page.tsx    # Admin dynamic table example
│   └── form-demo/page.tsx     # Admin dynamic form example
└── user/
    ├── layout.tsx             # User shell layout (user sidebar, header)
    └── page.tsx               # User dashboard home page
```

### Route Synchronization (Sidebar + Breadcrumbs)
The sidebars in both Admin and User sections read configuration dynamically from [nav-config.ts](file:///run/media/naim0018/Primary1TB/Projects/Starter-Template/next-starter-template/src/lib/nav-config.ts):
- `adminNavItems`: Grouped navigation items for the Admin panel.
- `userNavItems`: Grouped navigation items for the User dashboard.

### Creating a New Page
1. Create a folder matching your path inside the target layout (e.g. `src/app/admin/reports`).
2. Add a `page.tsx` file exporting a default React component:
   ```tsx
   export default function ReportsPage() {
     return <div>Reports Dashboard</div>;
   }
   ```
3. Update [nav-config.ts](file:///run/media/naim0018/Primary1TB/Projects/Starter-Template/next-starter-template/src/lib/nav-config.ts) under the respective group to make it appear in the sidebar automatically.
