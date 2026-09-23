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
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%232450C8'/><rect x='46' y='8' width='8' height='16' fill='white'/><rect x='38' y='14' width='24' height='6' fill='white'/><path d='M30 30 L70 30 L80 80 L20 80 Z' fill='white'/></svg>",
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
