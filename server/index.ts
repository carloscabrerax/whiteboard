const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

type Point = { x: Number; y: number }

type DrawLine = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}

io.on("connection", (socket: any) => {
  console.log(`User Connected: ${socket.id}`)

  // socket.on("join_room", (data) => {
  //   socket.join(data);
  // });

  // socket.on("send_message", (data) => {
  //   socket.to(data.room).emit("receive_message", data);
  //   console.log(data)
  // });

  socket.on('client-ready', () => {
    socket.broadcast.emit('get-canvas-state')
  })

  socket.on('canvas-state', (state: string) => {
    socket.broadcast.emit('canvas-state-from-server', state)
  })

  socket.on("clear", () => io.emit("clear"))

  socket.on("draw-line", ({ prevPoint, currentPoint, color }: DrawLine) => {
    socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color })
  })
})

server.listen(3001, () => {
  console.log("Server listening on port 3001")
})
