import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gio CRM",
  description: "Conversion-focused CRM for small teams"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
