"use client";

import { useSyncExternalStore } from "react";

const LABELS: Record<string, string> = {
  resume: "your copy of my resume",
  github: "GitHub",
  x: "X",
  linkedin: "LinkedIn",
};

function detectSource(): string | null {
  const utm = new URLSearchParams(window.location.search).get("utm_source");
  if (utm) return utm;
  if (!document.referrer) return null;
  try {
    const h = new URL(document.referrer).hostname;
    if (h.endsWith("github.com")) return "github";
    if (h === "t.co" || h.endsWith("x.com") || h.endsWith("twitter.com"))
      return "x";
    if (h.endsWith("linkedin.com") || h === "lnkd.in") return "linkedin";
    if (h !== window.location.hostname) return h;
  } catch {}
  return null;
}

function subscribe() {
  return () => {};
}

function getServerSnapshot(): string | null | undefined {
  return undefined;
}

export default function Trace() {
  const source = useSyncExternalStore(
    subscribe,
    detectSource,
    getServerSnapshot,
  );

  if (!source) return null;

  const label = LABELS[source] ?? source;

  return <p className="greeting">Glad you found this from {label}.</p>;
}
