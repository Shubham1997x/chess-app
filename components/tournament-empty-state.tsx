import { Button } from "@/components/ui/button"

type TournamentEmptyStateProps = {
  onResetFilters: () => void
}

export function TournamentEmptyState({
  onResetFilters,
}: TournamentEmptyStateProps) {
  return (
    <div
      className="content-panel flex flex-col items-center justify-center gap-4 px-6 py-16 text-center"
      role="status"
    >
      <p className="text-lg font-medium text-foreground">
        No tournaments match
      </p>
      <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
        Try a different filter or reset to see all available events.
      </p>
      <Button type="button" variant="outline" onClick={onResetFilters}>
        Reset filters
      </Button>
    </div>
  )
}
