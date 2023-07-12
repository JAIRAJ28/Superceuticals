const express = require("express");
const { user_Task } = require("../Model/Task.model");
const task = express.Router();
const socket=require("../Socket/socket");

task.post("/createTask", async (req, res) => {
  console.log(req.body);
  try {
    const { title, description, dueDate, myid, username } = req.body;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    let days = due.getTime() - currentDate.getTime();
    let priority;
    if (days <= 24 * 60 * 60 * 1000) {
      priority = "High";
    } else if (days > 24 * 60 * 60 * 1000 && days <= 3 * 24 * 60 * 60 * 1000) {
      priority = "Medium";
    } else {
      priority = "Low";
    }
    const task = new user_Task({
      title,
      description,
      dueDate,
      status: false,
      priority: priority.toUpperCase(),
      myid: myid,
      name: username,
    });

    await task.save();
    socket.emit("taskCreated",`New task has been created by ${username}`);
    res.status(200).send({ message: "Task Added Successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
task.get("/all",async(req,res)=>{
  try {
    const task = await user_Task.find()
    if(task.length > 0) {
    res.status(200).send(task);
    }else{
      res.status(400).send("No task present");
    }
  } catch (error) {
    res.status(400).send({ message: error.message, route: "/all route of task" });
  }
})
//get the task route
task.get("/", async (req, res) => {
  const myid = req.body.myid;
  try {
    const tasks = await user_Task.find({ myid });
    if(tasks.length > 0) {
    res.status(200).send(tasks);
    }else{
      res.status(400).send("No task present");
    }
  } catch (error) {
    res.status(400).send({ message: error.message, route: "/ route of task" });
  }
});


//filter task


task.get("/filter_task", async (req, res) => {
  const { status, priority, dueDate } = req.query;
  console.log(status, priority, dueDate);
  try {
    const filter = {
      myid: req.body.myid,
      priority: "HIGH",
    };
    if (status) {
      filter.status = JSON.parse(status);
    }
    if (priority) {
      filter.priority = priority.toUpperCase();
    }
    if (dueDate) {
      let date = new Date(dueDate);
      date.setUTCHours(0, 0, 0, 0);
      filter.dueDate = date;
    }
    console.log(filter);
    const tasks = await user_Task.find(filter);
    if (tasks.length) {
      res.status(200).send(tasks);
    } else {
      res.status(400).send({ message: "No task found" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//patch request

task.patch("/update_task/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const task = await user_Task.findById(id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }
    if (req.body.myid !== task.myid) {
      return res.status(403).send({ message: "You cannot update others task" });
    }
    task.status = !task.status;
    await task.save();
    
    socket.emit("taskCreated",`New task has been updated as ${task.status?"Completed":"Pending"} by ${task.name}`);

    res.status(200).send({
      message: "Task status updated successfully",
      status: task.status,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//sort requests

task.get("/sort", async (req, res) => {
  const { sortBy, sortOrder } = req.query;
  console.log(sortBy, sortOrder);
  const sortCriteria = {};

  if (sortBy === "status" || sortBy === "dueDate" || sortBy === "priority") {
    sortCriteria[sortBy] = sortOrder === "desc" ? -1 : 1;
  } else {
    return res.status(400).json({ message: "Invalid sortBy criteria" });
  }

  try {
    const sortedTasks = await user_Task
      .find({ myid: req.body.myid })
      .sort(sortCriteria);
    res.status(200).json(sortedTasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete request   ./////

task.delete("/delete_task/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const data = await user_Task.findById({_id:id});
  console.log(data, {id})
  try {
    if (req.body.myid !== data.myid) {
      res
        .status(401)
        .send({ message: "You are not allowed to delete others task" });
    } else {
      await user_Task.findByIdAndDelete({ _id: id });
      socket.emit("taskCreated",`New task has been delted by ${data.name}`);

      res
        .status(200)
        .send({ message: "The Task Has Been Deleted Successfully" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = {
  task,
};
