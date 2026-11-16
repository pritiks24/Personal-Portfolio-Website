import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pritika’s Portfolio",
  description: "Explore Pritika Lahiri’s projects, experiences, music, and travel through an interactive phone-inspired portfolio.",
  openGraph: {
    title: "Pritika’s Portfolio",
    siteName: "Pritika’s Portfolio",
    description: "Projects, experiences, music, and a little about me.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
