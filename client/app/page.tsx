"use client"

import { useEffect, useState } from "react"
import { ChromePicker } from "react-color"
import { io } from "socket.io-client"
import { useDraw } from "@/hooks/useDraw"
import { drawLine, type DrawLineProps } from "@/utils/drawLine"


const socket = io(process.env.NEXT_PUBLIC_API_URL as string)
console.log(process.env.NEXT_PUBLIC_API_URL)
// const socket = io("http://localhost:3001")

export default function Home() {
  const { canvasRef, onMouseDown, clear } = useDraw(createLine)
  const [color, setColor] = useState<string>("#000")

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
      console.log("state received")
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
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex flex-row gap-2 mb-2">
        <button
          type="button"
          className="p-2 border-2 border-red-800 text-red-800 hover:bg-red-800 hover:text-white m-2 rounded-md"
          onClick={() => {
            socket.emit("clear")
          }}
        >
          Clear
        </button>
        <ChromePicker color={color} onChange={(e: any) => setColor(e.hex)} />
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
