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

const messages = [
    {message: "Hello Anton", id: "qqq111www222eee333", user: {id: "qzxcxsdqwe11fdfas", name: "Valentyn"}},
    {message: "Hello Valentyn", id: "1fewdffqd31dewdf33", user: {id: "g53g2fd13fwrr1dws", name: "Anton"}}
]

app.get('/', (req, res) => {
    res.send("hi, this is back for ws chat")
})

socket.on("connection", (socketChannel) => {
    socketChannel.on("client-message-sent", (message) => {
        const messageItem = {
            message: message, id: String(new Date().valueOf()), user: {id: "qzxcxsdqwe11fdfas", name: "Valentyn"}
        }
        messages.push(messageItem)
        socket.emit("new-message-sent", messageItem)
    })

    socketChannel.emit("init-messages-published", messages)
    console.log("user has been connected!!!!")
});

const PORT = process.env.PORT || 3007

server.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
});