import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Ours vs Train",
  description: "Quelle est la différence entre un ours et un train ?",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <header className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <nav className="mx-auto flex max-w-3xl items-center justify-between">
            <Link href="/" className="font-semibold">
              🐻 Ours vs Train 🚆
            </Link>
            <Link
              href="/stats"
              className="text-sm font-medium text-amber-700 hover:underline dark:text-amber-300"
            >
              Statistiques
            </Link>
          </nav>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  );
}
