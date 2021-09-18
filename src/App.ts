import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const socket = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.send("hello success is on your way! This is ws server 123!")
})

socket.on("connection", (connection) => {
    console.log("user has been connected")
});

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});