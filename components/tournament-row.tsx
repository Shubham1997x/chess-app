import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  formatStartTime,
  isTournamentFull,
  playersProgress,
} from "@/lib/tournaments"
import type { Tournament } from "@/types/tournament"
import { cn } from "@/lib/utils"

type TournamentRowProps = {
  tournament: Tournament
  isJoined: boolean
  isJoining: boolean
  onJoin: (id: string) => void
}

export function TournamentRow({
  tournament,
  isJoined,
  isJoining,
  onJoin,
}: TournamentRowProps) {
  const full = isTournamentFull(tournament)
  const joinDisabled = full || isJoined || isJoining
  const progress = playersProgress(
    tournament.playersJoined,
    tournament.maxPlayers,
  )

  let joinLabel = "Join"
  if (isJoining) joinLabel = "Joining"
  else if (isJoined) joinLabel = "Joined"
  else if (full) joinLabel = "Full"

  const joinVariant = isJoined
    ? "secondary"
    : full
      ? "destructive"
      : "default"

  const showFullStyle = full && !isJoined

  return (
    <tr
      className={cn(
        "border-b border-border transition-colors last:border-0",
        "hover:bg-muted/40 focus-within:bg-muted/40",
        tournament.status === "live" && "bg-primary/5",
      )}
    >
      <td className="px-4 py-4">
        <span className="font-medium text-foreground">{tournament.name}</span>
      </td>
      <td className="px-4 py-4">
        <Badge
          variant="secondary"
          className="rounded-lg border border-border bg-secondary px-2.5 py-0.5 text-xs normal-case tracking-normal"
        >
          {tournament.timeControl}
        </Badge>
      </td>
      <td className="px-4 py-4 text-sm text-muted-foreground">
        <time dateTime={tournament.startTime}>
          {formatStartTime(tournament.startTime)}
        </time>
      </td>
      <td className="px-4 py-4">
        <div className="min-w-24 space-y-1.5">
          <span className="text-sm font-medium tabular-nums text-foreground">
            {tournament.playersJoined} / {tournament.maxPlayers}
          </span>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={tournament.playersJoined}
            aria-valuemin={0}
            aria-valuemax={tournament.maxPlayers}
            aria-label={`${tournament.playersJoined} of ${tournament.maxPlayers} players`}
          >
            <div
              className={cn(
                "h-full rounded-full transition-all",
                showFullStyle ? "bg-destructive" : "bg-primary",
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <Badge
          variant={tournament.status === "live" ? "default" : "outline"}
          className="rounded-lg px-2.5 py-0.5 text-xs normal-case tracking-normal"
        >
          {tournament.status === "live" ? "Live" : "Upcoming"}
        </Badge>
      </td>
      <td className="px-4 py-4 text-right">
        <Button
          type="button"
          size="sm"
          variant={joinVariant}
          disabled={joinDisabled}
          aria-disabled={joinDisabled}
          aria-busy={isJoining}
          aria-label={
            isJoined
              ? `Already joined ${tournament.name}`
              : full
                ? `${tournament.name} is full`
                : `Join ${tournament.name}`
          }
          onClick={() => onJoin(tournament.id)}
          className={cn(
            "min-w-20 gap-1.5 normal-case tracking-normal",
            "disabled:pointer-events-none disabled:opacity-100",
            showFullStyle &&
              "disabled:border-destructive/50 disabled:bg-destructive/15 disabled:text-destructive",
            isJoined &&
              "disabled:border-primary/40 disabled:bg-primary/15 disabled:text-primary",
            isJoining &&
              "disabled:border-primary/50 disabled:bg-primary/25 disabled:text-primary-foreground",
          )}
        >
          <span>{joinLabel}</span>
        </Button>
      </td>
    </tr>
  )
}
