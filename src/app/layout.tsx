import type { Metadata } from "next";
import { IBM_Plex_Mono, Sora } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://checkit-content-explorer.example"),
  title: {
    default: "Checkit Content Explorer",
    template: "%s | Checkit Content Explorer",
  },
  description:
    "A server-rendered product explorer with shareable search, category filters, and polished async states.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${ibmPlexMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        <div className="relative min-h-screen overflow-x-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(51,102,255,0.18),_transparent_55%)]" />
          <header className="sticky top-0 z-40 border-b border-border/80 bg-background/88 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-sm font-semibold text-accent">
                  CE
                </span>
                <span>
                  <span className="block text-sm font-medium uppercase tracking-[0.28em] text-muted-foreground">
                    Checkit
                  </span>
                  <span className="block text-base font-semibold tracking-tight text-foreground">
                    Content Explorer
                  </span>
                </span>
              </Link>

              <p className="hidden max-w-sm text-right text-sm leading-6 text-muted-foreground md:block">
                Server-rendered catalog, shareable filters, and calm product UI.
              </p>
            </div>
          </header>

          <main className="relative z-10 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
