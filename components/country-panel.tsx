"use client"

import { Heart, X, MapPin, PlayCircle, Music } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useAtlas } from "@/components/atlas-context"

export function CountryPanel() {
  const { selectedCountry, selectCountry, toggleFavorite, isFavorite } =
    useAtlas()

  if (!selectedCountry) return null
  const fav = isFavorite(selectedCountry.name)

  return (
    <aside className="flex w-full shrink-0 flex-col border-l border-border bg-background/50 backdrop-blur-md md:w-[420px] md:absolute md:right-0 md:top-0 md:h-full md:z-10 shadow-2xl">
      <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-5">
        <h2 className="truncate text-2xl font-bold tracking-tight">
          {selectedCountry.name}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(selectedCountry.name)}
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            className={cn(
              "flex size-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground",
              fav && "bg-destructive/15 text-destructive",
            )}
          >
            <Heart className={cn("size-5", fav && "fill-current")} />
          </button>
          <button
            onClick={() => selectCountry(null)}
            aria-label="Close panel"
            className="flex size-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-7 overflow-y-auto px-6 py-6">
        <p className="leading-relaxed text-muted-foreground">
          {selectedCountry.description}
        </p>

        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <MapPin className="size-4" />
            Notable Regions
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCountry.regions.map((r) => (
              <span
                key={r}
                className="rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-primary"
              >
                {r}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Traditional Instruments
          </h3>
          <div className="space-y-3">
            {selectedCountry.instruments.map((ins) => (
              <div key={ins.name} className="flex gap-4 rounded-xl bg-card p-3">
                <Image
                  src={ins.image || "/placeholder.svg"}
                  alt={ins.name}
                  width={80}
                  height={80}
                  className="size-20 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold">{ins.name}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {ins.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <PlayCircle className="size-4" />
            Curated Playlist
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-xl bg-card">
            {selectedCountry.playlist.map((track, i) => (
              <li
                key={track.title}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent"
              >
                <span className="w-4 text-sm tabular-nums text-muted-foreground">
                  {i + 1}
                </span>
                <Music className="size-4 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{track.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {track.artist}
                  </p>
                </div>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {track.duration}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  )
}
