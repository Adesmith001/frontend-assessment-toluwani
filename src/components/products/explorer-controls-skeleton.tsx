export function ExplorerControlsSkeleton() {
  return (
    <section className="surface-panel rounded-[32px] p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="h-3 w-20 animate-pulse rounded-full bg-border" />
          <div className="h-8 w-72 animate-pulse rounded-full bg-border" />
        </div>
        <div className="h-8 w-28 animate-pulse rounded-full bg-border" />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.6fr)_auto]">
        <div className="h-14 animate-pulse rounded-[20px] bg-border" />
        <div className="h-14 animate-pulse rounded-[20px] bg-border" />
        <div className="h-14 animate-pulse rounded-full bg-border" />
      </div>
    </section>
  );
}
