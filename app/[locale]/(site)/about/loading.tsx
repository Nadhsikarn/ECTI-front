export default function AboutLoading() {
  return (
    <div className="animate-pulse">
      {/* Page header skeleton */}
      <div className="bg-secondary/40 px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 h-4 w-32 rounded bg-muted" />
          <div className="mb-3 h-9 w-64 rounded bg-muted" />
          <div className="h-5 w-96 rounded bg-muted" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Mission & Vision */}
        <div className="mb-20 grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 h-12 w-12 rounded-xl bg-muted" />
            <div className="mb-3 h-6 w-32 rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
              <div className="h-4 w-4/6 rounded bg-muted" />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 h-12 w-12 rounded-xl bg-muted" />
            <div className="mb-3 h-6 w-32 rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-5/6 rounded bg-muted" />
              <div className="h-4 w-4/6 rounded bg-muted" />
            </div>
          </div>
        </div>

        {/* Board members skeleton */}
        <div className="mb-8 h-8 w-48 rounded bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                </div>
              </div>
              <div className="h-3 w-full rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
