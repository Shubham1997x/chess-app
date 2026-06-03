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
    <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
      <table className="w-full min-w-[720px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            <th scope="col" className="px-4 py-3">
              Name
            </th>
            <th scope="col" className="px-4 py-3">
              Time control
            </th>
            <th scope="col" className="px-4 py-3">
              Start time
            </th>
            <th scope="col" className="px-4 py-3">
              Players
            </th>
            <th scope="col" className="px-4 py-3">
              Status
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
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
  )
}
