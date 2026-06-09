"use client"

import { Globe, Compass, Music2, Award, LogOut, MapPin } from "lucide-react"
import { useAtlas } from "@/components/atlas-context"

export function ProfileView() {
  const { exploredCountries, favorites, signOut, setView } = useAtlas()

  const instrumentsFound = Math.max(exploredCountries.length, favorites.length > 0 ? 2 : 1)
  const worldPct = Math.max(1, Math.round((exploredCountries.length / 195) * 100))

  const stats = [
    {
      icon: <Globe className="size-6" />,
      value: `${worldPct}%`,
      label: "World Discovered",
      tint: "bg-primary/15 text-primary",
    },
    {
      icon: <Compass className="size-6" />,
      value: `${exploredCountries.length}`,
      label: "Countries Explored",
      tint: "bg-emerald-500/15 text-emerald-400",
    },
    {
      icon: <Music2 className="size-6" />,
      value: `${instrumentsFound}`,
      label: "Instruments Found",
      tint: "bg-fuchsia-500/15 text-fuchsia-400",
    },
    {
      icon: <Award className="size-6" />,
      value: `${favorites.length}`,
      label: "Favorites Saved",
      tint: "bg-rose-500/15 text-rose-400",
    },
  ]

  const stamps = exploredCountries.length
    ? exploredCountries
    : ["643"]

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex size-24 items-center justify-center rounded-full bg-card ring-2 ring-primary">
            <span className="flex size-[5.25rem] items-center justify-center rounded-full bg-background text-primary">
              <Globe className="size-10" />
            </span>
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Music Passport</h1>
            <p className="mt-1 text-muted-foreground">
              Explorer Level:{" "}
              <span className="font-semibold text-primary">Wanderer</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            signOut()
            setView("signin")
          }}
          className="flex items-center justify-center gap-2 self-start rounded-xl border border-border bg-card px-5 py-3 font-semibold transition-colors hover:bg-accent"
        >
          <LogOut className="size-5" />
          Sign Out
        </button>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center rounded-2xl bg-card p-6 text-center"
          >
            <span
              className={`mb-4 flex size-12 items-center justify-center rounded-full ${s.tint}`}
            >
              {s.icon}
            </span>
            <span className="text-3xl font-bold">{s.value}</span>
            <span className="mt-1 text-sm text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-card p-6">
        <h2 className="text-xl font-bold">Passport Stamps</h2>
        <div className="mt-6 flex flex-wrap gap-5">
          {stamps.map((c) => (
            <div
              key={c}
              className="flex size-28 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-destructive/60 text-destructive"
            >
              <MapPin className="size-5" />
              <span className="max-w-[5rem] truncate px-1 text-center text-sm font-bold">
                {c}
              </span>
            </div>
          ))}
          {stamps.length === 0 && (
            <p className="text-muted-foreground">
              Explore countries on the map to earn stamps.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
