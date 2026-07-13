# MovieReviews

A full-featured movie review platform built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS 4**.

## Features

- **Movie catalog** — a curated library of films with posters, genres, cast, director, runtime, and synopsis (`app/lib/movies.ts`).
- **Browse & discover** — live search (title, director, cast), genre filtering, and sorting (A–Z, newest, oldest, longest) on `/movies`.
- **Movie detail pages** — statically generated (SSG) pages with a backdrop header, full metadata, and reviews.
- **Reviews & ratings**
  - Interactive 1–5 star picker with an optional headline.
  - Server-side validation (required fields, rating range, length limits).
  - Rating summary with average, count, and a star-distribution bar chart.
  - Sort reviews by most recent, most helpful, or highest rated.
  - "Helpful" votes and review deletion.
- **Watchlist** — add/remove any movie; persisted in `localStorage` and synced across tabs (`/watchlist`).
- **Polished UI** — responsive grid, light/dark mode, sticky navbar, hover animations, and graceful poster fallbacks when offline.

## Architecture

| Path | Purpose |
| --- | --- |
| `app/lib/movies.ts` | Movie catalog + lookup/genre helpers |
| `app/lib/types.ts` | Shared `Movie`, `Review`, `RatingSummary` types |
| `app/lib/ratings.ts` | Rating aggregation |
| `app/lib/useWatchlist.ts` | localStorage-backed watchlist hook |
| `app/api/reviews/route.ts` | `GET` (list + summary) / `POST` (create) |
| `app/api/reviews/[id]/route.ts` | `PATCH` (helpful vote) / `DELETE` |
| `app/components/*` | UI: cards, star rating, forms, lists, navbar |
| `data/reviews.json` | Persisted reviews (file-based store) |

## API

```
GET    /api/reviews?movieId=<id>&sort=recent|helpful|rating
POST   /api/reviews            { movieId, author, rating (1–5), title?, comment }
PATCH  /api/reviews/:id        { action: "helpful" }
DELETE /api/reviews/:id
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Reviews persist to `data/reviews.json` in the project root.

> Poster images load from TMDB's public CDN and fall back to a titled gradient when offline — no API key required.
