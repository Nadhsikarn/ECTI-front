export default function EventsLoading() {
  return (
    <div className="animate-pulse">
      {/* Page header skeleton */}
      <div className="bg-secondary/40 px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 h-4 w-32 rounded bg-muted" />
          <div className="mb-3 h-9 w-48 rounded bg-muted" />
          <div className="h-5 w-80 rounded bg-muted" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        {/* Filter bar skeleton */}
        <div className="mb-8 flex flex-wrap gap-3">
          <div className="h-10 w-32 rounded-lg bg-muted" />
          <div className="h-10 w-32 rounded-lg bg-muted" />
          <div className="h-10 w-40 rounded-lg bg-muted" />
        </div>

        {/* Event cards skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="h-48 w-full bg-muted" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-20 rounded-full bg-muted" />
                  <div className="h-6 w-24 rounded-full bg-muted" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
