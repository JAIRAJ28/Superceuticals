import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthProvider';
import style from "../Css/all.module.css";
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io("https://superneutical.onrender.com"); 
export const All_task = () => {
  let { token,store } = useContext(AuthContext);
  const [state, setState] = useState();
  const [socketMessage, setSocketMessage] = useState("");

  useEffect(() => {
    
    socket.on("taskCreated", (message) => {
      setSocketMessage(message);
    });


    all_data();
    
  }, [store,socket]);

  console.log(socketMessage)

  const all_data = () => {
    axios.get(`https://superneutical.onrender.com/task/all`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setState(res.data);
      }).catch(err => console.log(err));
  };

  return (
    <div className={style.container}>
      <h3>Users Data</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {state?.length <= 0 ?
            <tr>
              <td className={style.noData} colSpan="6">No Data Available</td>
            </tr> :
            state?.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td className={item.priority === "HIGH" ? style.redbox : item.priority === "MEDIUM" ? style.low : style.greenbox}>
                  {item.priority}
                </td>
                <td>{item.dueDate.slice(0, 10)}</td>
                <td className={item.status ? style.Greenbox : style.RedBox}>
                  {item.status ? "Completed" : "Not Completed"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
