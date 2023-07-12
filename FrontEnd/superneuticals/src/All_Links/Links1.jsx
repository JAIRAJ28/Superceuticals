import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext/AuthProvider'
import { NavLink, useNavigate } from 'react-router-dom'

export const Links1 = () => {
  let {auth,setAuth,handelAuth,name,setToken,token}=useContext(AuthContext)
  let nav=useNavigate()
  return (
    <div>
        <NavLink className="navLink" activeClassName="activeNav" to="/allTask">
        All_Task
        </NavLink>

        <NavLink className="navLink" activeClassName="activeNav" to="/myTask">
        My_Task
        </NavLink>
        <button 
        onClick={()=>{
          handelAuth(false)
          nav("/")
          }}
          style={{padding:"5px 30px",marginLeft:"30%",borderRadius:"20px"}}
        >
            Logout
        </button>
    </div>
  )
}
