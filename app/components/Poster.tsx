"use client";

import { useState } from "react";

// Renders a remote poster, falling back to a titled gradient when the image
// fails to load (e.g. offline). Plain <img> keeps this dependency-free.
export default function Poster({
  src,
  alt,
  color,
  className = "",
}: {
  src: string;
  alt: string;
  color: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex items-center justify-center p-4 text-center ${className}`}
        style={{
          background: `linear-gradient(150deg, ${color}, #0b0b0f)`,
        }}
      >
        <span className="text-sm font-semibold leading-tight text-white/90">
          {alt}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
