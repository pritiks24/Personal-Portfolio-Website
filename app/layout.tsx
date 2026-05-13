import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Software Engineering Portfolio",
  description: "A phone OS inspired portfolio for a CS and software engineering undergraduate.",
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
