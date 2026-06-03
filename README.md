# Chess Tournament List

A Next.js App Router assignment: browse tournaments in a table, filter by time control or status, and join events (mocked on the client).

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm run typecheck
npm run lint
```

## Features

- **Tournament table** with name, time control, start time, players joined (`joined / max`), and status (Live / Upcoming)
- **One filter**: choose **Time control** or **Status**, then pick a value (All, Blitz, Rapid, Classical, or All, Upcoming, Live)
- **Join** (mocked): increments player count; button disabled when full (also shows Joined after you join)
- **States**: loading skeleton, fetch error with retry, empty results with reset filters
- **Accessibility**: table headers, filter labels, `aria-live` join feedback, keyboard focus on controls

## Data approach

Data lives in [`data/tournaments.json`](data/tournaments.json) and is exposed via a mocked API at [`app/api/tournaments/route.tsx`](app/api/tournaments/route.tsx).

The UI **fetches** `/api/tournaments` instead of importing JSON on the page because:

1. It mirrors a real client/server boundary (easy to replace with a database later).
2. A **loading** state is natural while the request runs.
3. The JSON file stays the single source of truth for the mock backend.

## Key decisions

| Topic | Choice |
|-------|--------|
| Layout | Responsive HTML table (scrolls horizontally on small screens) |
| Rendering | Server page shell + client `TournamentList` for fetch, filter, and join |
| Filter | Radio for dimension (time control vs status) + one dropdown; switching dimension resets to All |
| Join | In-memory `useState` only; refresh restores data from the API |
| Helpers | Pure functions in [`lib/tournaments.ts`](lib/tournaments.ts) |

## Trade-offs

- Join state is not persisted (within assignment scope).
- No SSR prefetch; tournaments load after mount so loading UI is visible.
- “Joined” disables the button in addition to “Full” for clearer feedback.

## Manual test checklist

1. Throttle network → skeleton, then table.
2. Filter **Time control** → **Blitz** → only Blitz rows.
3. Switch to **Status** → **Live** → only live rows (filter value resets to All when switching type).
4. Join a tournament → players count increases; button shows **Joined**.
5. **Classical Night League** (`t6`) and **Blitz Lightning Hour** (`t7`) → **Full** without joining.
6. Filter to a value with no matches → empty state + **Reset filters**.

## Troubleshooting

If you see **Could not load tournaments**, stop the dev server, delete `.next`, and run `npm run dev` again.

