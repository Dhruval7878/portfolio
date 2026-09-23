"use client";

import { sendGAEvent } from "@next/third-parties/google";

const LINKS = [
  {
    id: "email",
    href: "mailto:dhruval0254@gmail.com",
    text: "dhruval0254@gmail.com",
  },
  { id: "github", href: "https://github.com/Dhruval7878", text: "GitHub" },
  { id: "x", href: "https://x.com/Dhruval254", text: "X" },
  { id: "resume", href: "https://bit.ly/dhruval_patadiya", text: "Resume" },
];

export default function ContactLinks() {
  return (
    <div className="links">
      {LINKS.map((l) => (
        <a
          key={l.id}
          href={l.href}
          onClick={() => sendGAEvent("event", "contact_click", { link: l.id })}
        >
          {l.text}
        </a>
      ))}
    </div>
  );
}
