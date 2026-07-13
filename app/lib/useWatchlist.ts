"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "movie:watchlist";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useWatchlist() {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIds(read());
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setIds(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore quota errors */
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const next = ids.includes(id)
        ? ids.filter((x) => x !== id)
        : [...ids, id];
      persist(next);
    },
    [ids, persist]
  );

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  return { ids, has, toggle, ready };
}
