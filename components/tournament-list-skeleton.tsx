import { Skeleton } from "@/components/ui/skeleton"

export function TournamentListSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading tournaments">
      <div className="content-panel space-y-4 p-5 sm:p-6">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-10 w-full max-w-xs" />
        <Skeleton className="h-10 w-48" />
      </div>
      <Skeleton className="mx-1 h-4 w-40" />
      <div className="content-panel overflow-hidden">
        <div className="border-b border-border bg-muted/40 px-4 py-3.5">
          <div className="flex gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-16" />
            ))}
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 border-b border-border px-4 py-4 last:border-0"
          >
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-14" />
            <Skeleton className="ml-auto h-9 w-20" />
          </div>
        ))}
      </div>
    </div>
  )
}
