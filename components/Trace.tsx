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
  const source = useSyncExternalStore(subscribe, detectSource, getServerSnapshot);

  const label = source ? LABELS[source] ?? source : "the open internet";

  const lines: React.ReactNode[] = [
    <>
      <span className="ok">CALL</span>
      {"    "}dhruval@dhruval.dev
    </>,
    <>
      <span className="k">from</span>
      {"    "}
      {label}
    </>,
    <>
      <span className="k">lookup</span>
      {"  "}registered, online
    </>,
    <>
      <span className="k">status</span>
      {"  "}open to backend + applied AI roles
    </>,
    <>
      <span className="k">route</span>
      {"   "}direct <span className="fb">(fallback ready)</span>
    </>,
    <>
      <span className="ok">200 OK</span>
      {"  "}connected. scroll down.
    </>,
  ];

  return (
    <pre
      className="trace"
      aria-label="Call trace: connecting you to Dhruval. Status: online and open to backend and applied AI roles."
    >
      {source !== undefined &&
        lines.map((l, i) => (
          <span
            key={i}
            className="l"
            style={{ animationDelay: `${150 + i * 260}ms` }}
          >
            {l}
          </span>
        ))}
    </pre>
  );
}
