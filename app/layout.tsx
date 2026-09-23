import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dhruval.dev"),
  title: "Dhruval — backend engineer",
  description:
    "Backend engineer in Bengaluru. Real-time systems, WebRTC calling, notifications, and applied AI.",
  openGraph: {
    title: "Dhruval — backend engineer",
    description:
      "I build backend systems that keep working when the first path fails.",
    url: "https://dhruval.dev",
  },
  icons: {
    icon:
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%232450C8'/><g fill='white'><rect x='46' y='6' width='8' height='14'/><rect x='36' y='12' width='28' height='7'/><circle cx='50' cy='27' r='8'/><rect x='44' y='33' width='12' height='6'/><path d='M32,41 C28,53 23,61 19,73 C17,79 17,85 21,89 L79,89 C83,85 83,79 81,73 C77,61 72,53 68,41 Z'/><ellipse cx='50' cy='89' rx='34' ry='6'/></g></svg>",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
