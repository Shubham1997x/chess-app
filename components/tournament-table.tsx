import { TournamentRow } from "@/components/tournament-row"
import { sortTournamentsForDisplay } from "@/lib/tournaments"
import type { Tournament } from "@/types/tournament"

type TournamentTableProps = {
  tournaments: Tournament[]
  joinedIds: Set<string>
  joiningId: string | null
  onJoin: (id: string) => void
}

export function TournamentTable({
  tournaments,
  joinedIds,
  joiningId,
  onJoin,
}: TournamentTableProps) {
  const sorted = sortTournamentsForDisplay(tournaments)

  return (
    <div className="content-panel overflow-hidden">
      <p className="border-b border-border px-4 py-2 text-xs text-muted-foreground sm:hidden">
        Scroll horizontally to see all columns
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <caption className="sr-only">
            Chess tournaments with time control, start time, players, status,
            and join action
          </caption>
          <thead className="sticky top-0 z-10 bg-muted/90 backdrop-blur-sm">
            <tr className="border-b border-border text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              <th scope="col" className="px-4 py-3.5">
                Name
              </th>
              <th scope="col" className="px-4 py-3.5">
                Time control
              </th>
              <th scope="col" className="px-4 py-3.5">
                Start time
              </th>
              <th scope="col" className="px-4 py-3.5">
                Players
              </th>
              <th scope="col" className="px-4 py-3.5">
                Status
              </th>
              <th scope="col" className="px-4 py-3.5 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((tournament) => (
              <TournamentRow
                key={tournament.id}
                tournament={tournament}
                isJoined={joinedIds.has(tournament.id)}
                isJoining={joiningId === tournament.id}
                onJoin={onJoin}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
