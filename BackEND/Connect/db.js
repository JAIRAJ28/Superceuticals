const Mongoose = require("mongoose");
require("dotenv").config();

const connect = Mongoose.connect(process.env.MONGO_URL);
// console.log(connect)

module.exports = {
  connect,
};
