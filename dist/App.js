"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const socket = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
app.get('/', (req, res) => {
    res.send("hi, this is back for ws chat");
});
const messages = [
    { message: "Hello Anton", id: "qqq111www222eee333", user: { id: "qzxcxsdqwe11fdfas", name: "Valentyn" } },
    { message: "Hello Valentyn", id: "1fewdffqd31dewdf33", user: { id: "g53g2fd13fwrr1dws", name: "Anton" } }
];
const usersState = new Map();
socket.on("connection", (socketChannel) => {
    usersState.set(socketChannel, { id: String(new Date().valueOf()), name: "anonym" });
    socket.on("disconnect", () => {
        usersState.delete(socketChannel);
    });
    socketChannel.on("client-name-sent", (userName) => {
        if (typeof userName !== "string")
            return;
        const user = usersState.get(socketChannel);
        user.name = userName;
    });
    socketChannel.on("client-message-sent", (message) => {
        if (typeof message !== "string")
            return;
        const user = usersState.get(socketChannel);
        const messageItem = {
            message: message, id: String(new Date().valueOf()),
            user: { id: user.id, name: user.name }
        };
        messages.push(messageItem);
        socket.emit("new-message-sent", messageItem);
    });
    socketChannel.emit("init-messages-published", messages);
    console.log("user has been connected!!!!");
});
const PORT = process.env.PORT || 3007;
server.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
//# sourceMappingURL=App.js.map