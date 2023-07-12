const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {  type: String, required: true},
  dueDate: {type: Date,required: true},
  status: {type: Boolean, required: true},
  priority: {type: String, enum: ["HIGH", "MEDIUM", "LOW"], required: true },
  myid: {type: String, required: true},
  name: {type: String, required: true}
},
{ versionKey: false }
);

const user_Task = mongoose.model("Task", taskSchema);

module.exports = {
  user_Task
};
