import React, { useState } from 'react';
import style from '../Css/signup.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: ''
  });

  const nav = useNavigate();

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state)
    axios
      .post('https://superneutical.onrender.com/users/signup', state)
      .then((res) => {
        // console.log(res);
        if(res){
        toast.success(`${res.data.message}  manage your task's here`);
        setTimeout(()=>{
          nav('/');
        },6000)
      }
        
      })
      .catch((err) => toast.error("A User With This Email Address Is Already Registered"));
  };

  return (
    <div className={style.mainLogin}>
      <ToastContainer position="bottom-center" /> {/* Set the position to bottom-center */}
      <form action="" className={style.loginForm} onSubmit={handleSubmit}>
        <label htmlFor="">NAME</label>
        <input
          type="text"
          placeholder="ENTER YOUR NAME"
          name="name"
          value={state.name}
          required
          onChange={handleChange}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder="ENTER YOUR EMAIL"
          name="email"
          value={state.email}
          required
          onChange={handleChange}
        />
        <label htmlFor="">PASSWORD</label>
        <input
          type="password"
          placeholder="ENTER YOUR PASSWORD"
          name="password"
          value={state.password}
          required
          onChange={handleChange}
        />
        <input type="Submit" value="SIGN IN" />
      </form>
    </div>
  );
};
