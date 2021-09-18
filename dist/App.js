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
const socket = new socket_io_1.Server(server);
app.get('/', (req, res) => {
    res.send("hello success is on your way! This is ws server");
});
socket.on("connection", (connection) => {
    console.log("user has been connected");
});
const PORT = process.env.PORT || 3007;
server.listen(PORT, () => {
    console.log("listening on *:3009");
});
//# sourceMappingURL=App.js.map