"use client"

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  HelpCircle,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const TOTAL = 222 // 3:42 in seconds

function fmt(sec: number) {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function PlayerBar() {
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(84) // 1:24
  const [volume, setVolume] = useState(0.5)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setTime((t) => (t >= TOTAL ? 0 : t + 1))
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [playing])

  return (
    <footer className="flex h-20 items-center gap-3 border-t border-border bg-card px-3 md:gap-6 md:px-6">
      {/* Track info */}
      <div className="flex min-w-0 items-center gap-3 md:w-64">
        <Image
          src="/album-dubliners.png"
          alt="Album cover for The Rocky Road to Dublin"
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            The Rocky Road to Dublin
          </p>
          <p className="truncate text-xs text-muted-foreground">
            The Dubliners
          </p>
        </div>
      </div>

      {/* Controls + progress */}
      <div className="flex flex-1 flex-col items-center gap-1.5">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setTime((t) => Math.max(0, t - 15))}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Previous"
          >
            <SkipBack className="size-5 fill-current" />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <Pause className="size-5 fill-current" />
            ) : (
              <Play className="size-5 translate-x-0.5 fill-current" />
            )}
          </button>
          <button
            onClick={() => setTime((t) => Math.min(TOTAL, t + 15))}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Next"
          >
            <SkipForward className="size-5 fill-current" />
          </button>
        </div>

        <div className="flex w-full max-w-xl items-center gap-2">
          <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">
            {fmt(time)}
          </span>
          <input
            type="range"
            min={0}
            max={TOTAL}
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            aria-label="Seek"
            className="atlas-range h-1 flex-1"
            style={{ "--pct": `${(time / TOTAL) * 100}%` } as React.CSSProperties}
          />
          <span className="w-9 text-xs tabular-nums text-muted-foreground">
            {fmt(TOTAL)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div className="hidden items-center gap-2 md:flex">
        <Volume2 className="size-5 text-muted-foreground" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume"
          className="atlas-range h-1 w-24"
          style={{ "--pct": `${volume * 100}%` } as React.CSSProperties}
        />
      </div>

      <button
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Help"
      >
        <HelpCircle className="size-5" />
      </button>
    </footer>
  )
}
