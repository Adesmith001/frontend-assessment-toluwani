export function ExplorerControlsSkeleton() {
  return (
    <section className="space-y-6">
      <div className="h-14 animate-pulse bg-border" />
      <div className="space-y-4 border-t border-border pt-5">
        <div className="flex items-center justify-between gap-3">
          <div className="h-8 w-28 animate-pulse bg-border" />
          <div className="h-4 w-16 animate-pulse bg-border" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-10 w-24 animate-pulse border border-border bg-border/70"
            />
          ))}
        </div>
        <div className="h-12 animate-pulse bg-border" />
        <div className="flex items-center justify-between gap-4 border-t border-dashed border-border pt-4">
          <div className="h-8 flex-1 animate-pulse bg-border" />
          <div className="h-10 w-24 animate-pulse border border-border bg-border/70" />
        </div>
      </div>
    </section>
  );
}
