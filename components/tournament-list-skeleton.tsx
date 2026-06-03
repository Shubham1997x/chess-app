import { Skeleton } from "@/components/ui/skeleton"

export function TournamentListSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-lg border border-border bg-card"
      aria-busy="true"
      aria-label="Loading tournaments"
    >
      <div className="grid grid-cols-6 gap-4 border-b border-border bg-muted/40 px-4 py-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-full max-w-20" />
        ))}
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-6 gap-4 border-b border-border px-4 py-4 last:border-0"
        >
          <Skeleton className="h-4 col-span-2" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-4" />
          <Skeleton className="h-8 w-16 justify-self-end" />
        </div>
      ))}
    </div>
  )
}
