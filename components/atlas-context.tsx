"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import { getCountryInfo, type CountryInfo } from "@/lib/atlas-data"

export type View = "map" | "profile" | "signin" | "favorites"

type AtlasState = {
  view: View
  setView: (v: View) => void
  selectedCountry: CountryInfo | null
  selectCountry: (name: string | null) => void
  countryNames: string[]
  setCountryNames: (names: string[]) => void
  exploredCountries: string[]
  favorites: string[]
  toggleFavorite: (name: string) => void
  isFavorite: (name: string) => boolean
  signedIn: boolean
  signIn: () => void
  signOut: () => void
}

const AtlasContext = createContext<AtlasState | null>(null)

export function AtlasProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>("map")
  const [selectedCountry, setSelectedCountry] = useState<CountryInfo | null>(
    null,
  )
  const [exploredCountries, setExploredCountries] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [signedIn, setSignedIn] = useState(false)
  const [countryNames, setCountryNames] = useState<string[]>([])

  const selectCountry = useCallback((name: string | null) => {
    if (!name) {
      setSelectedCountry(null)
      return
    }
    const info = getCountryInfo(name)
    setSelectedCountry(info)
    setView("map")
    setExploredCountries((prev) =>
      prev.includes(info.name) ? prev : [...prev, info.name],
    )
  }, [])

  const toggleFavorite = useCallback((name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    )
  }, [])

  const isFavorite = useCallback(
    (name: string) => favorites.includes(name),
    [favorites],
  )

  return (
    <AtlasContext.Provider
      value={{
        view,
        setView,
        selectedCountry,
        selectCountry,
        countryNames,
        setCountryNames,
        exploredCountries,
        favorites,
        toggleFavorite,
        isFavorite,
        signedIn,
        signIn: () => setSignedIn(true),
        signOut: () => setSignedIn(false),
      }}
    >
      {children}
    </AtlasContext.Provider>
  )
}

export function useAtlas() {
  const ctx = useContext(AtlasContext)
  if (!ctx) throw new Error("useAtlas must be used within AtlasProvider")
  return ctx
}
