"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

function subscribe() {
  return () => {};
}

function isProdHost(): boolean {
  return window.location.hostname === "dhruval.dev";
}

function getServerSnapshot(): boolean {
  return false;
}

export default function Analytics({ gaId }: { gaId: string }) {
  const isProd = useSyncExternalStore(subscribe, isProdHost, getServerSnapshot);

  if (!isProd) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
