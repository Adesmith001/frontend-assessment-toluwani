import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sora = localFont({
  src: "./fonts/bahnschrift.ttf",
  variable: "--font-sora",
  display: "swap",
});

const ibmPlexMono = localFont({
  src: "./fonts/CascadiaMono.ttf",
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://checkit-content-explorer.example",
  ),
  title: {
    default: "XIV QR Product Explorer",
    template: "%s | XIV QR Product Explorer",
  },
  description:
    "A server-rendered product explorer with shareable search, category filters, and a fashion-led editorial UI.",
};

function MenuIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
      <path
        d="M4 7h10M4 12h16M4 17h8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M7 9V8a5 5 0 0 1 10 0v1M6 9h12l-1 9H7L6 9Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M16.5 18a4.5 4.5 0 0 0-9 0M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}


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
          <a href="#content" className="skip-link">
            Skip to content
          </a>
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <button
                type="button"
                aria-label="Open navigation"
                className="inline-flex h-11 w-11 items-center justify-center border border-border bg-surface-strong transition hover:border-foreground"
              >
                <MenuIcon />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Saved items"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-foreground bg-background transition hover:bg-foreground hover:text-background"
                >
                  <BagIcon />
                </button>
                <button
                  type="button"
                  aria-label="Profile"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-background transition hover:opacity-88"
                >
                  <ProfileIcon />
                </button>
              </div>
            </div>
          </header>

          <main id="content" className="relative z-10 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
