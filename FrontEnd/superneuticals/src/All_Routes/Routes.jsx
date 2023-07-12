import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../Components/Pages/Login'
import { Signup } from '../Components/Pages/Signup'
import { My_Task } from '../Components/Pages/My_Task'
import { All_task } from '../Components/Pages/All_task'
import { AuthProtected } from '../Protected_routes/Auth_protected'

export const All_Routes = () => {
  return (
    <div>
       <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/myTask" element={
            <AuthProtected>
            <My_Task/>
            </AuthProtected>}/>
            <Route path="/allTask" element={<AuthProtected><All_task/></AuthProtected>}/>
           
        </Routes>
    </div>
  )
}
