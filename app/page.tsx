import { TournamentList } from "@/components/tournament-list"

export default function Page() {
  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-2 border-b border-border pb-6">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Tournaments
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Browse events, filter by time control or status, and join when seats
            are available.
          </p>
        </header>
        <TournamentList />
      </div>
    </main>
  )
}
