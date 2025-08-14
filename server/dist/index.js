"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const allowedOrigins = [
    "http://localhost:3000",
    "https://whiteboard-sigma.vercel.app",
];
const io = new socket_io_1.Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
    },
    pingInterval: 10000,
    pingTimeout: 10000,
});
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("client-ready", () => {
        socket.broadcast.emit("get-canvas-state");
    });
    socket.on("canvas-state", (state) => {
        socket.broadcast.emit("canvas-state-from-server", state);
    });
    socket.on("clear", () => io.emit("clear"));
    socket.on("draw-line", ({ prevPoint, currentPoint, color }) => {
        socket.broadcast.emit("draw-line", { prevPoint, currentPoint, color });
    });
    socket.on("disconnect", (reason) => {
        console.log("User Disconnected:", socket.id, "reason:", reason);
    });
});
const PORT = Number(process.env.PORT) || 3001;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
});
