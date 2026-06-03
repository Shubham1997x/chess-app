import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatStartTime, isTournamentFull } from "@/lib/tournaments"
import type { Tournament } from "@/types/tournament"
import { CircleNotchIcon } from "@phosphor-icons/react"

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

  let joinLabel = "Join"
  if (isJoining) joinLabel = "Joining"
  else if (full) joinLabel = "Full"
  else if (isJoined) joinLabel = "Joined"

  return (
    <tr className="border-b border-border transition-colors hover:bg-muted/50">
      <td className="px-4 py-3">
        <span className="font-medium text-foreground">{tournament.name}</span>
      </td>
      <td className="px-4 py-3 text-sm text-foreground">
        {tournament.timeControl}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        <time dateTime={tournament.startTime}>
          {formatStartTime(tournament.startTime)}
        </time>
      </td>
      <td className="px-4 py-3 text-sm text-foreground">
        {tournament.playersJoined} / {tournament.maxPlayers}
      </td>
      <td className="px-4 py-3">
        <Badge
          variant={tournament.status === "live" ? "default" : "outline"}
        >
          {tournament.status === "live" ? "Live" : "Upcoming"}
        </Badge>
      </td>
      <td className="px-4 py-3 text-right">
        <Button
          type="button"
          size="sm"
          variant={isJoined ? "secondary" : "default"}
          disabled={joinDisabled}
          aria-disabled={joinDisabled}
          aria-busy={isJoining}
          onClick={() => onJoin(tournament.id)}
          className="min-w-18 gap-1.5 normal-case tracking-normal"
        >
          {isJoining ? (
            <CircleNotchIcon className="size-4 animate-spin" aria-hidden />
          ) : null}
          <span>{joinLabel}</span>
        </Button>
      </td>
    </tr>
  )
}
