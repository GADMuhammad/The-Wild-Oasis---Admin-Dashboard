# The Wild Oasis — Admin Dashboard

An internal admin dashboard for a cabin/hotel booking business. Staff use it to manage cabins, bookings, guest check-in/check-out, and hotel-wide settings, with a live overview of recent activity and revenue.

## Features

- **Dashboard** — bookings, revenue, check-ins and occupancy-rate stat tiles for a selectable date range (last 7/30/90 days), a sales area chart (total vs. extras revenue), a stay-duration breakdown pie chart, and a "Today" panel listing arrivals/departures with one-click check-in/check-out.
- **Bookings** — sortable, filterable (by status), paginated table of all bookings; per-row menu to view details, check in, check out, or delete; a full booking detail page.
- **Check-in / Check-out** — dedicated check-in flow with breakfast add-on and payment confirmation; one-click check-out from the bookings table or dashboard.
- **Cabins** — CRUD for cabins (name, capacity, price, discount, description, air conditioning, photo upload to Supabase Storage), with duplicate and sort/filter support.
- **Users** — create new staff accounts (sign-up, admin-only).
- **Account** — update your own name/avatar and password.
- **Settings** — hotel-wide booking rules (min/max nights, max guests, breakfast price).
- **Dark mode** — persisted (localStorage) light/dark theme toggle, following the OS preference by default.
- **Auth** — Supabase-backed authentication with protected routes; unauthenticated users are redirected to `/login`.

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router 7](https://reactrouter.com/) for routing
- [TanStack Query](https://tanstack.com/query) for server-state (fetching, caching, mutations)
- [Supabase](https://supabase.com/) for the database, auth, and file storage
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [React Hook Form](https://react-hook-form.com/) for form handling/validation
- [Recharts](https://recharts.org/) for the dashboard charts
- [date-fns](https://date-fns.org/) for date logic
- [react-hot-toast](https://react-hot-toast.com/) for notifications
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) for top-level error handling
- [Motion](https://motion.dev/) (`motion/react`) for animation

## Animations

Content that renders as a list or a group of sections cascades in with a staggered fade/slide-up (via `motion/react`), rather than appearing all at once:

- **Tables** — `Table.Body` rows (bookings, cabins).
- **Dashboard** — the stat tiles, "Today" panel, and both charts.
- **Booking detail** — `BookingDataBox`, cascading header → guest info → data items → price bar → footer.
- **Check-in** — the whole check-in page, with the nested `BookingDataBox` cascade folded into the page-level sequence.
- **Forms** — `SignupForm` and `UpdateSettingsForm`, cascading field-by-field via `Form`/`FormRow`.
- **Settings** and **Users** pages — heading in, then the form.

The shared `ui` primitives that sit in these paths (`Row`, `Heading`, `Form`, `FormRow`, `DataItem`, `DashboardBox`) are animation-*capable* rather than animated: each is a `motion` element with a `variants` prop, but only animates when a page-level ancestor sets `initial`/`animate` and the variant labels (`hidden`/`show`) propagate down. This keeps every other usage of those components inert by default, and avoids extra wrapper `<div>`s that would break sibling-position CSS (e.g. `first:`/`last:`/`not-last:` selectors on table rows and form rows).

## Getting Started

```bash
npm install
npm run dev
```

The app runs against a live Supabase project (configured in `src/services/supabase.js`).

### Available Scripts

| Command           | Description                        |
| ------------------ | ----------------------------------- |
| `npm run dev`       | Start the Vite dev server           |
| `npm run build`     | Build for production                |
| `npm run preview`   | Preview the production build        |
| `npm run lint`      | Run ESLint                          |

## Project Structure

```
src/
├── pages/          Route-level page components
├── features/        Feature-scoped components + React Query hooks,
│                    grouped by domain (dashboard, bookings, cabins,
│                    check-in-out, authentication, settings)
├── ui/               Reusable, presentational UI components
├── services/         Supabase query/mutation wrappers (one file per table)
├── context/          React context providers (dark mode)
├── hooks/            Generic reusable hooks
├── data/             Seed data + a dev-only Supabase uploader utility
└── utils/            Formatting helpers and constants
```

Styling is done entirely with Tailwind CSS utility classes, driven by a custom theme (`src/index.css`) that defines the color palette, spacing, radii, and shadows used across the app — including a dark-mode variant applied via a `.dark` class on `<html>`.
