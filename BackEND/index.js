const cors = require("cors");
const express = require("express");
const Socket = require("socket.io");
const app = express();
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const http = require("http");
const { connect } = require("./Connect/db");
const { signin } = require("./Routes/Auth.route");
const { auth } = require("./Middlewares/Auth");
const { task } = require("./Routes/Task.route");
const Server = http.createServer(app);
app.use(cors());
require("dotenv").config();
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

Server.listen(process.env.PORT, async () => {
  try {
    await connect;
    console.log("HELLO FORM index.js listen");
  } catch (error) {
    console.log(error, "In the index.js listen");
  }
});
