import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Takamitsu Motoyoshi Minimap Remake",
  description: "A simple reacreation of the original Takamitsu Motoyoshi Minimap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
