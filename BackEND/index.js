const cors = require("cors");
const express = require("express");
const Socket = require("socket.io");
const app = express();
app.use(cors());
const http = require("http");
const { connect } = require("./Connect/db");
const { signin } = require("./Routes/Auth.route");
const { auth } = require("./Middlewares/Auth");
const { task } = require("./Routes/Task.route");
require("dotenv").config();


const Server = http.createServer(app);
const io = Socket(Server,{
  cors: {
    origin: "*", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specified methods
  },
});

app.use(express.json())
app.get("/", async (req, res) => {
  try {
    console.log("HELLO FORM HOME");
    res.send("HOME");
  } catch (error) {
    console.log(error);
  }
});





app.use("/users",signin)
app.use(auth)
app.use("/task",task)

io.on("connection", (socket) => {
  console.log("User connected");
   
});



Server.listen(process.env.PORT, async () => {
  try {
    await connect;
    console.log("HELLO FORM index.js listen");
  
    // io.on("taskCreated", (data) => {
      // Send a message to all connected clients
    //   io.emit("taskCreated", data);
    // });

    // Listen for task deleted events
    // io.on("taskDeleted", (data) => {
      // Send a message to all connected clients
    //   io.emit("taskDeleted", data);
    // });

    // // Listen for task updated events
    // io.on("taskUpdated", (data) => {
      // Send a message to all connected clients
    //   io.emit("taskUpdated", data);
    // });
  } catch (error) {
    console.log(error, "In the index.js listen");
  }
});

// module.exports={
//   io:io
// }
