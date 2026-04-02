const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
      {skeletonItems.map((item) => (
        <div key={item}>
          <div className="aspect-[4/5] animate-pulse border border-border bg-border/70" />
          <div className="space-y-2 border-x border-b border-border bg-surface-strong px-3 py-3">
            <div className="h-3 w-20 animate-pulse bg-border" />
            <div className="h-5 w-5/6 animate-pulse bg-border" />
            <div className="h-3 w-1/2 animate-pulse bg-border" />
            <div className="flex justify-between pt-1">
              <div className="h-4 w-16 animate-pulse bg-border" />
              <div className="h-4 w-10 animate-pulse bg-border" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
