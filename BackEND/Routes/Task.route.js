const express= require('express')
const { user_Task } = require('../Model/Task.model')
const task=express.Router()

task.post('/createTask',async(req,res)=>{
    console.log(req.body)
   try {
    const{title,description,dueDate,id,username} = req.body
    const currentDate=new Date()
    const due=new Date(dueDate)
    let days=due.getTime()-currentDate.getTime();
    let priority;
    if(days<=24 * 60 * 60 * 1000){
       priority="High"
    }else if(days>24 * 60 * 60 * 1000 && days<=3*24 * 60 * 60 * 1000){
        priority="Medium"
    }else {
        priority="Low"
    }
    const task = new user_Task({
        title,
        description,
        dueDate,
        status:false,
        priority,
        id:id,
        name:username
    });
  
      await task.save();
      res.status(200).send({message: "Task Added Successfully"})
   } catch (error) {
     res.status(400).send({message:error.message})
   }
})
task.get('/',async(req,res)=>{
    try {
        const tasks=await tasks.find({id:req.body.id});
        req.status(200).send({message: "Task Added Successfully"})
    } catch (error) {
        req.status(400).send({message:error.message,"route":"/ route of task"})
    }
})

task.get('/filter_task',async(req,res)=>{
    const {status,priority,dueDate}=req.query
    console.log(status,priority,dueDate)
    try {
       const filter = {
        id:req.body.id
       }
       if(status){
        filter.status= !status
       }
       if(priority){
        filter.priority= priority.toUpperCase()
       }
       if(dueDate){
        filter.dueDate= new Date(dueDate)
       }
       console.log(filter)
       const tasks = await user_Task.find(filter);
       if(tasks.length){
       res.status(200).send(tasks);
       }else{
        res.status(200).send({message:"No task found"});
       }
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

// task.get('/update_task/:id', async (req, res) => {
//     const { id } = req.params;
//     console.log(id);
//     try {
//       const task = await user_Task.findById(id);
//       if (!task) {
//         return res.status(404).send({ message: 'Task not found' });
//       }
//       if (req.body.id !== task.id) {
//         return res.status(403).send({ message: 'You cannot update others task' });
//       }
//       task.status = !task.status;
//       await task.save();
//       res.status(200).send({ message: 'Task status updated successfully', status: task.status });
//     } catch (error) {
//       res.status(400).send({ message: error.message });
//     }
//   });



// task.delete('/delete_task/:id',async(req,res)=>{
//     const {id}=req.params
//     const data=await user_Task.findById(id)
//   try{
//       if(req.body.id!==data.id){
//         res.status(401).send({message:"You are not allowed to delete others task"})
//       }
//       else{
//         await user_Task.findByIdAndDelete({_id:id})
//         res.status(200).send({message:"The Task Has Been Deleted Successfully"})
//       }
//   }catch(error){
//     res.status(400).send({message:error.message})
//   }
// })



module.exports={
    task
}

