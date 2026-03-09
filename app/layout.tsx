import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/ui/header";

export const metadata: Metadata = {
  title: "UpsideLens | Stock Analysis Platform",
  description: "Decision-support platform for stock opportunity discovery"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
