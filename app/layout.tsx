import type { Metadata, Viewport } from "next";
import { Ubuntu, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const sans = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
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
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%232450C8'/><g fill='white'><rect x='46' y='6' width='8' height='14'/><rect x='37' y='13' width='26' height='6'/><circle cx='50' cy='26' r='7'/><rect x='44' y='33' width='12' height='5'/><polygon points='42,38 58,38 76,84 24,84'/><rect x='16' y='84' width='68' height='7' rx='3'/></g></svg>",
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
