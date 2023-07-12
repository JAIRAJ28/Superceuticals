import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../AuthContext/AuthProvider';


export const AuthProtected = ({children}) => {
  let {auth}=useContext(AuthContext)
 

   let nav=useNavigate()
   if(!auth){
    toast.error('Please Login To Visit The Site!');
    return <Navigate to="/"/>
   }

  return (
    <div>
      {children}
    </div>
  )
}
