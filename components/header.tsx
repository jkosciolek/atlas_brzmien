"use client"

import { Globe, Search, Sun, Moon, Heart, User, MapPin } from "lucide-react"
import { useState, useRef, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useAtlas } from "@/components/atlas-context"

export function Header() {
  const { view, setView, countryNames, selectCountry } = useAtlas()
  const [dark, setDark] = useState(true)
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const searchRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return countryNames
      .filter((n) => n.toLowerCase().includes(q))
      .slice(0, 8)
  }, [query, countryNames])

  useEffect(() => {
    setActive(0)
  }, [query])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  function choose(name: string) {
    selectCountry(name)
    setQuery("")
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => (a + 1) % results.length)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => (a - 1 + results.length) % results.length)
    } else if (e.key === "Enter") {
      e.preventDefault()
      choose(results[active])
    } else if (e.key === "Escape") {
      setOpen(false)
    }
  }

  function toggleTheme() {
    const root = document.documentElement
    const next = !dark
    setDark(next)
    root.classList.toggle("dark", next)
  }

  return (
    <header className="flex h-16 items-center justify-between gap-3 border-b border-border bg-background px-4 md:px-6">
      <button
        onClick={() => setView("map")}
        className="flex shrink-0 items-center gap-3"
        aria-label="Atlas Brzmień home"
      >
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
          <Globe className="size-6" />
        </span>
        <span className="hidden text-lg font-semibold tracking-tight sm:block">
          Atlas Brzmień
        </span>
      </button>

      <div ref={searchRef} className="relative mx-2 max-w-5xl flex-1">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder="Search countries, instruments..."
            aria-label="Search countries"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden"
          />
        </div>

        {open && query.trim() && (
          <ul className="absolute left-0 right-0 top-full z-40 mt-2 max-h-80 overflow-y-auto rounded-2xl border border-border bg-popover p-1.5 shadow-2xl">
            {results.length === 0 && (
              <li className="px-3 py-2.5 text-sm text-muted-foreground">
                No countries found for &ldquo;{query}&rdquo;
              </li>
            )}
            {results.length > 0 && results.map((name, i) => (
              <li key={name}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => choose(name)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                    i === active
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <MapPin className="size-4 shrink-0 text-primary" />
                  <span className="font-medium">{name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1 md:gap-2">
        <button
          onClick={toggleTheme}
          className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>

        <NavButton
          active={view === "favorites"}
          onClick={() => setView("favorites")}
          icon={<Heart className={cn("size-5", view === "favorites" && "fill-current")} />}
          label="Favorites"
          activeClass="bg-destructive/15 text-destructive"
        />
        <NavButton
          active={view === "profile" || view === "signin"}
          onClick={() => setView("profile")}
          icon={<User className="size-5" />}
          label="Profile"
          activeClass="bg-primary/15 text-primary"
        />
      </div>
    </header>
  )
}

function NavButton({
  active,
  onClick,
  icon,
  label,
  activeClass,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  activeClass: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        active && activeClass,
      )}
    >
      {icon}
      <span className="hidden md:block">{label}</span>
    </button>
  )
}