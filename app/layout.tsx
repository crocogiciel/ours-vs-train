import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Institut de Corrélation Ours–Train",
  description:
    "Institut de recherche indépendant consacré à l'étude de la corrélation entre les ours et les trains.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${sourceSerif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-serif text-ink">
        <header className="border-b-2 border-ink px-6 py-6">
          <div className="mx-auto flex max-w-3xl flex-wrap items-end justify-between gap-4">
            <Link href="/" className="block">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
                Département de Zoologie Comparée &amp; Génie Ferroviaire
              </p>
              <h1 className="mt-1 font-serif text-xl font-semibold leading-none sm:text-2xl">
                Institut de Corrélation Ours–Train
              </h1>
            </Link>
            <nav>
              <Link
                href="/stats"
                className="border border-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper"
              >
                Bulletin statistique
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="border-t border-line px-6 py-6">
          <p className="mx-auto max-w-3xl font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
            Institut fictif à but strictement comique. Aucun ours ni train n&apos;a été consulté
            dans la production de ces résultats.
          </p>
        </footer>
      </body>
    </html>
  );
}
