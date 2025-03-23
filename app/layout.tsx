import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhruval Patadiya - Software Developer",
  description: "Software Developer | Passionate about coding, problem-solving, and creating impactful software solutions.",
  openGraph: {
    title: "Dhruval Patadiya - Software Developer",
    description: "Software Developer | Passionate about coding, problem-solving, and creating impactful software solutions.",
    url: "https://dhruval.live", // Update with your personal website or portfolio URL
    siteName: "Dhruval Patadiya",
    type: "website",
    // images: [
    //   {
    //     url: "https://yourwebsite.com/your-image.jpg",
    //     width: 800,
    //     height: 600,
    //     alt: "Dhruval's profile picture",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - Software Developer",
    description: "Software Developer | Passionate about coding, problem-solving, and creating impactful software solutions.",
    // images: ["https://yourwebsite.com/your-image.jpg"],
    site: "@Dhruval254",
  },
  keywords: [
    "Software Developer",
    "Web Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Tech Enthusiast",
    "Coding",
    "Programming",
    "Tech Blog",
    "Open Source Contributor",
    "UI/UX Design",
    "Software Solutions",
    "Software Architecture",
    "Dhruval SDE"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
