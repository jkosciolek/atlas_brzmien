"use client"

import { Heart, Share2, MapPin, PlayCircle } from "lucide-react"
import { useAtlas } from "@/components/atlas-context"
import { getCountryInfo } from "@/lib/atlas-data"

export function FavoritesView() {
  const { favorites, selectCountry, setView } = useAtlas()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight">
            <Heart className="size-8 fill-rose-500 text-rose-500" />
            Your Favorites
          </h1>
          <p className="mt-2 text-muted-foreground">
            A collection of your favorite musical destinations.
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 self-start rounded-xl border border-border bg-card px-5 py-3 font-semibold transition-colors hover:bg-accent">
          <Share2 className="size-5" />
          Send to a Friend
        </button>
      </div>

      {favorites.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
          <Heart className="size-10 text-muted-foreground" />
          <p className="text-lg font-semibold">No favorites yet</p>
          <p className="max-w-sm text-muted-foreground">
            Explore the world map and tap the heart on a country to save it here.
          </p>
          <button
            onClick={() => setView("map")}
            className="mt-2 rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
          >
            Explore the map
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((name) => {
            const info = getCountryInfo(name)
            return (
              <div
                key={name}
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-600">
                  <MapPin className="size-16 text-white/40" />
                  <span className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                    {name}
                  </span>
                  <span className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-full bg-white/90 text-rose-500">
                    <Heart className="size-5 fill-current" />
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {info.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <PlayCircle className="size-4" />
                      {info.instruments.length} Instruments
                    </span>
                    <button
                      onClick={() => {
                        selectCountry(name)
                        setView("map")
                      }}
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      Explore →
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
