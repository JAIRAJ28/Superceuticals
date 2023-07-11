const http = require("http");
const Socket = require("socket.io");

const Server = http.createServer((req, res) => {
  res.json("Hello from Socket.js");
});

const io = new Socket.Server(Server);

io.on("connection", (socket) => {
  console.log("User connected");
});

module.exports = io;