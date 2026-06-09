"use client"

import { AtlasProvider, useAtlas } from "@/components/atlas-context"
import { Header } from "@/components/header"
import { PlayerBar } from "@/components/player-bar"
import { WorldMap } from "@/components/world-map"
import { CountryPanel } from "@/components/country-panel"
import { ProfileView } from "@/components/profile-view"
import { SignInView } from "@/components/sign-in-view"
import { FavoritesView } from "@/components/favorites-view"

function Content() {
  const { view, signedIn } = useAtlas()

  if (view === "map") {
    return (
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        <div className="relative min-h-[45vh] flex-1 bg-background">
          <WorldMap />
        </div>
        <CountryPanel />
      </div>
    )
  }

  if (view === "profile") {
    return (
      <div className="flex-1 overflow-y-auto">
        {signedIn ? <ProfileView /> : <SignInView />}
      </div>
    )
  }

  if (view === "signin") {
    return (
      <div className="flex-1 overflow-y-auto">
        <SignInView />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <FavoritesView />
    </div>
  )
}

export function AtlasApp() {
  return (
    <AtlasProvider>
      <div className="flex h-dvh flex-col overflow-hidden">
        <Header />
        <main className="flex flex-1 flex-col overflow-hidden">
          <Content />
        </main>
        <PlayerBar />
      </div>
    </AtlasProvider>
  )
}
