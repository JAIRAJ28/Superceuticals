import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Links2 = () => {
  return (
    <div>
        <NavLink className="navLink" activeClassName="activeNav" to="/">
        Login
        </NavLink>
        <NavLink className="navLink" activeClassName="activeNav" to="/signup">
        Signup
        </NavLink>
    </div>
  )
}
