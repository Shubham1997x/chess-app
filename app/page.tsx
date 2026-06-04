import Image from "next/image"

import { TournamentList } from "@/components/tournament-list"

export default function Page() {
  return (
    <main className="min-h-svh bg-background">
      <a
        href="#tournaments"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to tournaments
      </a>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="content-panel mb-6 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Image
              src="/logo.png"
              alt=""
              width={56}
              height={56}
              className="size-14 shrink-0 rounded-lg object-contain"
              priority
              aria-hidden
            />
            <div className="space-y-2">
              <p className="text-xs font-medium tracking-wide text-primary uppercase">
                Chess events
              </p>
              <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
                Tournaments
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Browse upcoming and live events, filter by time control or
                status, and join when seats are available.
              </p>
            </div>
          </div>
        </header>

        <section id="tournaments" aria-labelledby="tournaments-heading">
          <h2 id="tournaments-heading" className="sr-only">
            Tournament list
          </h2>
          <TournamentList />
        </section>
      </div>
    </main>
  )
}
