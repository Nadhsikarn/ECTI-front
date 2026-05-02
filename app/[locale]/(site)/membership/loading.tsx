export default function MembershipLoading() {
  return (
    <div className="animate-pulse">
      {/* Page header skeleton */}
      <div className="bg-secondary/40 px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 h-4 w-32 rounded bg-muted" />
          <div className="mb-3 h-9 w-56 rounded bg-muted" />
          <div className="h-5 w-96 rounded bg-muted" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Benefits section skeleton */}
        <div className="mb-8 h-8 w-40 rounded bg-muted" />
        <div className="mb-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-5">
              <div className="h-8 w-8 shrink-0 rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div className="mb-8 h-8 w-48 rounded bg-muted" />
        <div className="mb-20 rounded-xl border border-border overflow-hidden">
          <div className="bg-primary/5 px-4 py-3 grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-5 rounded bg-muted" />
            ))}
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-4 py-4 grid grid-cols-4 gap-4 border-t border-border">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="h-5 rounded bg-muted" />
              ))}
            </div>
          ))}
        </div>

        {/* Steps skeleton */}
        <div className="mb-8 h-8 w-48 rounded bg-muted" />
        <div className="grid gap-8 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="h-14 w-14 rounded-full bg-muted" />
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-4 w-20 rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
