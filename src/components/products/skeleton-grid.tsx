const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

export function SkeletonGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {skeletonItems.map((item) => (
        <div
          key={item}
          className="surface-panel-strong overflow-hidden rounded-[28px]"
        >
          <div className="aspect-[4/3] animate-pulse bg-[linear-gradient(135deg,_rgba(49,94,255,0.12),_rgba(255,255,255,0.5))]" />
          <div className="space-y-4 p-5">
            <div className="h-3 w-24 animate-pulse rounded-full bg-border" />
            <div className="h-6 w-3/4 animate-pulse rounded-full bg-border" />
            <div className="space-y-2">
              <div className="h-3 animate-pulse rounded-full bg-border" />
              <div className="h-3 w-5/6 animate-pulse rounded-full bg-border" />
            </div>
            <div className="flex justify-between border-t border-border/70 pt-4">
              <div className="space-y-2">
                <div className="h-3 w-14 animate-pulse rounded-full bg-border" />
                <div className="h-5 w-20 animate-pulse rounded-full bg-border" />
              </div>
              <div className="space-y-2 text-right">
                <div className="ml-auto h-3 w-12 animate-pulse rounded-full bg-border" />
                <div className="ml-auto h-4 w-16 animate-pulse rounded-full bg-border" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
