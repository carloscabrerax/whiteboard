"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useDraw } from "@/hooks/useDraw"
import { drawLine, type DrawLineProps } from "@/utils/drawLine"
import ColorPalette from "@/components/color-palette"

const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
  transports: ["websocket"],
  // Ensures the client actively closes when the page unloads (Socket.IO v4+)
  closeOnBeforeunload: true,
})

export default function Home() {
  const { canvasRef, onMouseDown, clear } = useDraw(createLine)
  const [color, setColor] = useState<string>("#000000")

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit("draw-line", { prevPoint, currentPoint, color })
    drawLine({ prevPoint, currentPoint, ctx, color })
  }

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")

    socket.emit("client-ready")

    socket.on("get-canvas-state", () => {
      if (!canvasRef.current?.toDataURL()) return
      socket.emit("canvas-state", canvasRef.current.toDataURL())
    })

    socket.on("canvas-state-from-server", (state: string) => {
      const img = new Image()
      img.src = state
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
      }
    })

    socket.on(
      "draw-line",
      ({ prevPoint, currentPoint, color }: DrawLineProps) => {
        if (!ctx) return
        drawLine({ prevPoint, currentPoint, ctx, color })
      }
    )

    socket.on("clear", clear)

    return () => {
      socket.off("get-canvas-state")
      socket.off("canvas-state-from-server")
      socket.off("draw-line")
      socket.off("clear")
    }
  }, [canvasRef])

  return (
    <main className="flex flex-col items-center justify-between p-10 h-screen">
      <div className="flex flex-row gap-10 mb-2 bg-gradient-to-t from-slate-400  to-indigo-200 p-2 rounded-xl">
        <button
          type="button"
          className={[
            "relative h-8 w-8 rounded-md ring-1 ring-black/10 bg-white",
            "hover:ring-black/30 focus:outline-none focus:ring-2 focus:ring-slate-500",
          ].join(" ")}
          onClick={() => {
            socket.emit("clear")
          }}
        >
          🗑️
        </button>
        <div
          className="rounded-full h-8 w-8"
          style={{ backgroundColor: color }}
        ></div>
        <ColorPalette value={color} onChange={setColor} />
      </div>
      <div className="w-screen flex justify-center">
        <canvas
          onMouseDown={onMouseDown}
          ref={canvasRef}
          width={1000}
          height={750}
          className="border border-black bg-white rounded-md"
        ></canvas>
      </div>
    </main>
  )
}
