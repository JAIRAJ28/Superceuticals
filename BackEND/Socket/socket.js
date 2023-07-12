const http = require("http");
const cors = require("cors");
const Socket = require("socket.io");

const corsOptions = {
  origin: "*", // Replace "*" with the appropriate origin URL or whitelist of allowed origins
  methods: ["GET", "POST","DELETE","PATCH"], // Specify the allowed HTTP methods
};

const server = http.createServer(cors(corsOptions)); // Apply CORS middleware to the server
const io = new Socket.Server(server);

io.on("connection", (socket) => {
  console.log("User connected");
});

module.exports = io;
