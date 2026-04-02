import { ExplorerControlsSkeleton } from "@/components/products/explorer-controls-skeleton";
import { SkeletonGrid } from "@/components/products/skeleton-grid";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 pb-14 pt-6 sm:px-6 lg:px-8 lg:pt-8">
      <section className="grid gap-10 xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="h-4 w-32 animate-pulse bg-border" />
            <div className="border-t border-border pt-5">
              <div className="h-12 w-48 animate-pulse bg-border" />
              <div className="mt-3 h-12 max-w-sm animate-pulse bg-border" />
            </div>
          </div>
          <ExplorerControlsSkeleton />
        </div>
        <div className="space-y-6">
          <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <div className="h-3 w-28 animate-pulse bg-border" />
              <div className="h-5 w-40 animate-pulse bg-border" />
            </div>
            <div className="h-4 w-32 animate-pulse bg-border" />
          </div>
          <SkeletonGrid />
        </div>
      </section>
    </div>
  );
}
