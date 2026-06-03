import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  formatStartTime,
  isTournamentFull,
  playersProgress,
} from "@/lib/tournaments"
import type { Tournament } from "@/types/tournament"
import { cn } from "@/lib/utils"

type TournamentCardProps = {
  tournament: Tournament
  isJoined: boolean
  onJoin: (id: string) => void
}

export function TournamentCard({
  tournament,
  isJoined,
  onJoin,
}: TournamentCardProps) {
  const full = isTournamentFull(tournament)
  const progress = playersProgress(
    tournament.playersJoined,
    tournament.maxPlayers,
  )
  const joinDisabled = full || isJoined

  let joinLabel = "Join tournament"
  if (full) joinLabel = "Full"
  else if (isJoined) joinLabel = "Joined"

  return (
    <Card size="sm" className="gap-0 py-0">
      <CardHeader className="border-b border-border/60 px-5 py-4">
        <CardTitle className="text-base normal-case tracking-normal">
          {tournament.name}
        </CardTitle>
        <CardDescription className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Badge variant="secondary">{tournament.timeControl}</Badge>
          <Badge
            variant={tournament.status === "live" ? "default" : "outline"}
            className={cn(
              tournament.status === "live" &&
                "text-primary",
            )}
          >
            {tournament.status === "live" ? "Live" : "Upcoming"}
          </Badge>
        </CardDescription>
        <CardAction>
          <Button
            type="button"
            variant={isJoined ? "secondary" : "default"}
            size="sm"
            disabled={joinDisabled}
            aria-disabled={joinDisabled}
            onClick={() => onJoin(tournament.id)}
          >
            {joinLabel}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4 px-5 py-4">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Start time
            </dt>
            <dd>
              <time dateTime={tournament.startTime}>
                {formatStartTime(tournament.startTime)}
              </time>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Players
            </dt>
            <dd>
              {tournament.playersJoined} / {tournament.maxPlayers}
            </dd>
          </div>
        </dl>
        <div>
          <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
            <span>Capacity</span>
            <span>{progress}%</span>
          </div>
          <div
            className="h-1.5 w-full bg-muted"
            role="progressbar"
            aria-valuenow={tournament.playersJoined}
            aria-valuemin={0}
            aria-valuemax={tournament.maxPlayers}
            aria-label={`${tournament.playersJoined} of ${tournament.maxPlayers} players joined`}
          >
            <div
              className={cn(
                "h-full transition-all",
                full ? "bg-destructive/70" : "bg-primary",
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
