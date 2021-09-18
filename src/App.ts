import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.send("hello success is on your way! This is ws server!!!")
})

io.on("connection", (socket: any) => {
    console.log("user has been connected")
});

server.listen(3009, () => {
    console.log("listening on *:3009")
});