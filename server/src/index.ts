import express from "express"
import http from "http"
import { DisconnectReason, Server, Socket } from "socket.io"
import cors from "cors"

const app = express()
app.use(cors())

const server = http.createServer(app)

const allowedOrigins = [
  "http://localhost:3000",
  "https://whiteboard-sigma.vercel.app",
]

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
  pingInterval: 10000,
  pingTimeout: 10000,
})

type Point = { x: number; y: number }

type DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}

io.on("connection", (socket: Socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("client-ready", () => {
    socket.broadcast.emit("get-canvas-state")
  })

  socket.on("canvas-state", (state: string) => {
    socket.broadcast.emit("canvas-state-from-server", state)
  })

  socket.on("clear", () => io.emit("clear"))

  socket.on("draw-line", ({ prevPoint, currentPoint, color }: DrawLine) => {
    socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color })
  })

  socket.on("disconnect", (reason: DisconnectReason) => {
    console.log("User Disconnected:", socket.id, "reason:", reason)
  })
})

const PORT = Number(process.env.PORT) || 3001
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`)
})