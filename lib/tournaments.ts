import type { Tournament } from "@/types/tournament"

export type FilterType = "timeControl" | "status"
export type FilterValue = "all" | Tournament["timeControl"] | Tournament["status"]

export const TIME_CONTROL_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "Blitz", label: "Blitz" },
  { value: "Rapid", label: "Rapid" },
  { value: "Classical", label: "Classical" },
]

export const STATUS_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "upcoming", label: "Upcoming" },
  { value: "live", label: "Live" },
]

export function isTournamentFull(tournament: Tournament): boolean {
  return tournament.playersJoined >= tournament.maxPlayers
}

export function filterTournaments(
  tournaments: Tournament[],
  filterType: FilterType,
  filterValue: FilterValue,
): Tournament[] {
  if (filterValue === "all") {
    return tournaments
  }

  if (filterType === "timeControl") {
    return tournaments.filter((t) => t.timeControl === filterValue)
  }

  return tournaments.filter((t) => t.status === filterValue)
}

export function formatStartTime(iso: string): string {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso))
}

export function sortTournamentsForDisplay(
  tournaments: Tournament[],
): Tournament[] {
  return [...tournaments].sort((a, b) => {
    if (a.status !== b.status) {
      return a.status === "live" ? -1 : 1
    }
    return (
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )
  })
}
