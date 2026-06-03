"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { TournamentEmptyState } from "@/components/tournament-empty-state"
import { TournamentFilters } from "@/components/tournament-filters"
import { TournamentListSkeleton } from "@/components/tournament-list-skeleton"
import { TournamentTable } from "@/components/tournament-table"
import { Button } from "@/components/ui/button"
import {
  filterTournaments,
  isTournamentFull,
  type FilterType,
  type FilterValue,
} from "@/lib/tournaments"
import type { Tournament } from "@/types/tournament"

type LoadState = "loading" | "error" | "success"

export function TournamentList() {
  const [loadState, setLoadState] = useState<LoadState>("loading")
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [joinedIds, setJoinedIds] = useState<Set<string>>(() => new Set())
  const [filterType, setFilterType] = useState<FilterType>("timeControl")
  const [filterValue, setFilterValue] = useState<FilterValue>("all")
  const [statusMessage, setStatusMessage] = useState("")
  const [joiningId, setJoiningId] = useState<string | null>(null)

  const fetchTournaments = useCallback(async () => {
    setLoadState("loading")
    try {
      const res = await fetch("/api/tournaments", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load tournaments")
      const data = (await res.json()) as Tournament[]
      setTournaments(data)
      setLoadState("success")
    } catch {
      setLoadState("error")
    }
  }, [])

  useEffect(() => {
    fetchTournaments()
  }, [fetchTournaments])

  const filtered = useMemo(
    () => filterTournaments(tournaments, filterType, filterValue),
    [tournaments, filterType, filterValue],
  )

  const handleFilterTypeChange = (type: FilterType) => {
    setFilterType(type)
    setFilterValue("all")
  }

  const handleJoin = async (id: string) => {
    const tournament = tournaments.find((t) => t.id === id)
    if (
      !tournament ||
      joiningId !== null ||
      isTournamentFull(tournament) ||
      joinedIds.has(id)
    ) {
      return
    }

    setJoiningId(id)
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setTournaments((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, playersJoined: t.playersJoined + 1 } : t,
        ),
      )
      setJoinedIds((prev) => new Set(prev).add(id))
      setStatusMessage(`Joined ${tournament.name}`)
    } finally {
      setJoiningId(null)
    }
  }

  const resetFilters = () => {
    setFilterType("timeControl")
    setFilterValue("all")
  }

  if (loadState === "loading") {
    return <TournamentListSkeleton />
  }

  if (loadState === "error") {
    return (
      <div
        className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card px-6 py-12 text-center"
        role="alert"
      >
        <p className="text-sm text-muted-foreground">
          Could not load tournaments. Please try again.
        </p>
        <Button type="button" variant="outline" onClick={fetchTournaments}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <TournamentFilters
        filterType={filterType}
        filterValue={filterValue}
        onFilterTypeChange={handleFilterTypeChange}
        onFilterValueChange={setFilterValue}
      />

      <p className="sr-only" aria-live="polite">
        {statusMessage}
      </p>

      {filtered.length === 0 ? (
        <TournamentEmptyState onResetFilters={resetFilters} />
      ) : (
        <TournamentTable
          tournaments={filtered}
          joinedIds={joinedIds}
          joiningId={joiningId}
          onJoin={handleJoin}
        />
      )}
    </div>
  )
}
