import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const socket = new Server(server);

app.get('/', (req, res) => {
    res.send("hello success is on your way! This is ws server")
})

socket.on("connection", (connection) => {
    console.log("user has been connected")
});

const PORT = process.env.PORT || 3007

server.listen(PORT, () => {
    console.log("listening on *:3009")
});