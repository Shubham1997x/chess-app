import { Button } from "@/components/ui/button"

type TournamentEmptyStateProps = {
  onResetFilters: () => void
}

export function TournamentEmptyState({
  onResetFilters,
}: TournamentEmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/30 px-6 py-16 text-center"
      role="status"
    >
      <p className="text-base font-semibold text-foreground">
        No tournaments match
      </p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Try a different search or filter, or reset to see all events.
      </p>
      <Button type="button" variant="outline" onClick={onResetFilters}>
        Reset filters
      </Button>
    </div>
  )
}
