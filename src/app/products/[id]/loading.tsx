export default function ProductLoading() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <div className="mb-6 h-5 w-24 animate-pulse bg-border" />
      <div className="mb-8 h-4 w-64 animate-pulse bg-border" />
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.42fr)]">
        <div className="space-y-4">
          <div className="aspect-[4/5] animate-pulse border border-border bg-border/70" />
          <div className="flex gap-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="h-24 w-20 animate-pulse border border-border bg-border/70" />
            ))}
          </div>
        </div>

        <div>
          <div className="h-3 w-24 animate-pulse rounded-full bg-border" />
          <div className="mt-4 h-14 w-5/6 animate-pulse bg-border" />
          <div className="mt-4 h-6 w-40 animate-pulse bg-border" />
          <div className="mt-6 h-32 animate-pulse bg-border" />
          <div className="mt-8 space-y-0 border-y border-border">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="h-[61px] animate-pulse border-b border-border bg-border/40 last:border-b-0" />
            ))}
          </div>
          <div className="mt-8 h-12 animate-pulse bg-border" />
        </div>
      </div>
    </div>
  );
}
