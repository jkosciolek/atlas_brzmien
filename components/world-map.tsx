"use client"

import { useState, useRef } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps"
import { GEO_URL } from "@/lib/atlas-data"
import { useAtlas } from "@/components/atlas-context"

export function WorldMap() {
  const { selectedCountry, selectCountry, setCountryNames } = useAtlas()
  const [, setHovered] = useState<string | null>(null)
  const registered = useRef(false)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; name: string } | null>(
    null,
  )

  return (
    <div className="relative h-full w-full overflow-hidden">
      <ComposableMap
        projectionConfig={{ scale: 165 }}
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup center={[15, 25]} zoom={1} minZoom={1} maxZoom={5}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) => {
              if (!registered.current && geographies.length) {
                registered.current = true
                const names = geographies
                  .map((g) => g.properties.name as string)
                  .sort((a, b) => a.localeCompare(b))
                queueMicrotask(() => setCountryNames(names))
              }
              return geographies.map((geo) => {
                const name = geo.properties.name as string
                const isSelected = selectedCountry?.name === name
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => {
                      setHovered(name)
                      setTooltip({ x: e.clientX, y: e.clientY, name })
                    }}
                    onMouseMove={(e) =>
                      setTooltip({ x: e.clientX, y: e.clientY, name })
                    }
                    onMouseLeave={() => {
                      setHovered(null)
                      setTooltip(null)
                    }}
                    onClick={() => selectCountry(name)}
                    style={{
                      default: {
                        fill: isSelected
                          ? "var(--color-primary)"
                          : "oklch(0.32 0.03 260)",
                        stroke: "oklch(0.45 0.03 260)",
                        strokeWidth: 0.4,
                        outline: "none",
                        transition: "fill 0.2s ease",
                      },
                      hover: {
                        fill: isSelected
                          ? "var(--color-primary)"
                          : "oklch(0.45 0.08 275)",
                        stroke: "oklch(0.55 0.05 260)",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "var(--color-primary)",
                        outline: "none",
                      },
                    }}
                  />
                )
              })
            }}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {tooltip && (
        <div
          className="pointer-events-none fixed z-30 -translate-x-1/2 -translate-y-[140%] rounded-full bg-foreground px-3 py-1 text-sm font-medium text-background shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.name}
        </div>
      )}

      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-card/70 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
        Click a country to explore its music · scroll to zoom
      </p>
    </div>
  )
}
