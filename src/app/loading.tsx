import { ExplorerControlsSkeleton } from "@/components/products/explorer-controls-skeleton";
import { SkeletonGrid } from "@/components/products/skeleton-grid";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.6fr)] lg:items-end">
        <div className="space-y-4">
          <div className="h-3 w-28 animate-pulse rounded-full bg-border" />
          <div className="h-14 max-w-3xl animate-pulse rounded-[24px] bg-border" />
          <div className="h-6 max-w-2xl animate-pulse rounded-full bg-border" />
        </div>
        <div className="surface-panel-strong rounded-[32px] p-6">
          <div className="h-3 w-24 animate-pulse rounded-full bg-border" />
          <div className="mt-4 h-10 w-48 animate-pulse rounded-full bg-border" />
          <div className="mt-3 h-4 w-56 animate-pulse rounded-full bg-border" />
        </div>
      </section>
      <ExplorerControlsSkeleton />
      <SkeletonGrid />
    </div>
  );
}
