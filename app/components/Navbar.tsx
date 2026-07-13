import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/70">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="text-lg text-zinc-900 dark:text-zinc-50">MovieReviews</span>
        </Link>
        <div className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/movies"
            className="rounded-full px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Browse
          </Link>
          <Link
            href="/watchlist"
            className="rounded-full px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Watchlist
          </Link>
        </div>
      </nav>
    </header>
  );
}
