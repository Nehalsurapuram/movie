"use client";

import { useState } from "react";

function Star({ fill }: { fill: number }) {
  // fill: 0..1 fraction of the star that is filled
  const id = `g${Math.random().toString(36).slice(2)}`;
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="currentColor" />
          <stop offset={`${fill * 100}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
        fill={`url(#${id})`}
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

// Read-only display of an average rating (supports fractional stars).
export function StarDisplay({
  value,
  size = 16,
  className = "",
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  return (
    <div className={`flex text-amber-400 ${className}`} aria-label={`${value.toFixed(1)} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{ width: size, height: size }} className="inline-block">
          <Star fill={Math.max(0, Math.min(1, value - i))} />
        </span>
      ))}
    </div>
  );
}

// Interactive 1–5 picker for forms.
export function StarInput({
  value,
  onChange,
  size = 32,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: number;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="flex items-center gap-1 text-amber-400" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="transition-transform hover:scale-110"
          style={{ width: size, height: size }}
        >
          <Star fill={shown >= n ? 1 : 0} />
        </button>
      ))}
    </div>
  );
}
