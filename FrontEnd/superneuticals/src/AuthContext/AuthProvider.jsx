import React, { createContext, useRef, useState } from 'react'

export const AuthContext=createContext()

export const AuthContextProvider = ({children}) => {
    let [auth,setAuth]=useState(false)
    let [token,setToken]=useState("")
    let [store,socketstore]=useState(null)
    let name=useRef(null)
    
    const handelAuth=(n)=>{
      setAuth(n)
    }
  
    
  
  return (
    <AuthContext.Provider value={{auth,setAuth,handelAuth,name,token,setToken,store,socketstore}}>
      {children}
    </AuthContext.Provider>
  )
}
