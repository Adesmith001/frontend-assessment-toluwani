import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-4xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <section className="w-full border border-border bg-surface-strong p-8 sm:p-12">
        <p className="eyebrow text-muted-foreground">Missing route</p>
        <h1 className="mt-4 text-4xl font-semibold uppercase tracking-tight text-foreground">
          We couldn&apos;t find that product.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Head back to the explorer to continue browsing the catalog.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[48px] items-center justify-center border border-foreground bg-[#ddd6cb] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition hover:bg-foreground hover:text-background"
        >
          Return to catalog
        </Link>
      </section>
    </div>
  );
}
