export default function ProductLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mb-8 h-4 w-56 animate-pulse rounded-full bg-border" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
        <div className="space-y-4">
          <div className="surface-panel-strong rounded-[36px] p-4">
            <div className="aspect-[4/3] animate-pulse rounded-[28px] bg-border" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="surface-panel-strong rounded-[24px] p-3">
                <div className="aspect-square animate-pulse rounded-[18px] bg-border" />
              </div>
            ))}
          </div>
        </div>

        <div className="surface-panel-strong rounded-[36px] p-8 sm:p-10">
          <div className="h-3 w-24 animate-pulse rounded-full bg-border" />
          <div className="mt-5 h-14 w-5/6 animate-pulse rounded-[24px] bg-border" />
          <div className="mt-5 h-24 animate-pulse rounded-[24px] bg-border" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="h-28 animate-pulse rounded-[24px] bg-border" />
            <div className="h-28 animate-pulse rounded-[24px] bg-border" />
          </div>
        </div>
      </div>
    </div>
  );
}
