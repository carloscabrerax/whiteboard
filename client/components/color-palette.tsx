"use client"

import { randomHex } from "@/utils/randomHex"
import { useId } from "react"

type ColorPaletteProps = {
  value: string // currently selected color
  onChange: (hex: string) => void // callback when a color is chosen
  colors?: string[] // optional custom swatches
  className?: string
  allowRandom?: boolean // show optional dice to pick a random color
}

const DEFAULT_COLORS = [
  "#000000",
  "#FFFFFF",
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#EAB308",
  "#22C55E",
  "#10B981",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
]

export default function ColorPalette({
  value,
  onChange,
  colors = DEFAULT_COLORS,
  className = "",
  allowRandom = true,
}: ColorPaletteProps) {
  const listboxId = useId()

  return (
    <div className={className}>
      <div
        id={listboxId}
        role="listbox"
        aria-label="Color palette"
        className="flex flex-wrap gap-2"
      >
        {colors.map((c) => {
          const selected = c.toLowerCase() === value?.toLowerCase()
          return (
            <button
              key={c}
              type="button"
              role="option"
              aria-selected={selected}
              title={c}
              onClick={() => onChange(c)}
              className={[
                "relative h-8 w-8 rounded-md ring-1 ring-black/10",
                "hover:ring-black/30 focus:outline-none focus:ring-2 focus:ring-slate-500",
                selected ? "outline-none ring-2 ring-slate-500" : "",
              ].join(" ")}
              style={{ backgroundColor: c }}
            >
              {/* Selected indicator */}
              {selected && (
                <span className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2 ring-indigo-500" />
              )}
              <span className="sr-only">{c}</span>
            </button>
          )
        })}

        {allowRandom && (
          <button
            type="button"
            onClick={() => onChange(randomHex())}
            className="h-8 w-8 rounded-md border border-black/10 hover:border-black/30 uppercase
            bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
            title="Random color"
            aria-label="Pick a random color"
          >
            🎲
          </button>
        )}
      </div>
    </div>
  )
}
