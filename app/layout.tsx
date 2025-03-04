import type { Metadata } from "next";
import "./globals.css";
import ReactLenis from "lenis/react";

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
      <body className="antialiased">
        <ReactLenis root>{children}</ReactLenis>
      </body>
    </html>
  );
}
