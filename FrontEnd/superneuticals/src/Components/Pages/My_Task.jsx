import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import style from "../Css/mytask.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
const socket = io("https://superneutical.onrender.com"); 
export const My_Task = () => {
  let { auth, token,store,socketstore } =
    useContext(AuthContext);
    let nav=useNavigate()

  const [state, setState] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [socketa, setSocket] = useState(null);



  useEffect(() => {
    all_data();
    
    setSocket(socket)
    socketstore(socket)
    socket.on("taskCreated", handleSubmit);
    socket.on("taskDeleted", handelDelete);
    socket.on("taskUpdated", handelUpdate);
    if(!auth){
      nav("/")
    }
    // Clean up event listeners on unmount
    return () => {
      socket.disconnect("taskCreated", handleSubmit);
      socket.disconnect("taskDeleted", handelDelete);
      socket.disconnect("taskUpdated", handelUpdate);
    };
  }, [socket]);
  
  

  const fetchTasks = async () => {
    try {
      const params = {};
      if (status) {
        params.status = status;
      }
      if (priority) {
        params.priority = priority;
      }
      if (dueDate) {
        params.dueDate = dueDate;
      }
      console.log(params)
      const response = await axios.get('https://superneutical.onrender.com/task/filter_task', {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        setState(response.data);
        
      } else {
        toast.error("No Data Present");
      }
    } catch (error) {
      all_data()
      console.log(error);
    }
  };
  
  const sortTask = async () => {
    
    try {
      const response = await axios.get('https://superneutical.onrender.com/task/sort', {
        params: {
          sortBy,
          sortOrder,
        },
        headers: {
          Authorization:`Bearer ${token}`,
        },
      });
      setState(response.data);
      console.log(response);
    } catch (error) {
      all_data()
      console.log(error);
    }
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleSortSubmit = (e) => {
    e.preventDefault();
    sortTask();
  };

 


  const handleFilter=(e)=>{
    e.preventDefault();
    fetchTasks()
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    let data = { title, description, dueDate: date };
    console.log(data);
    axios
      .post(`https://superneutical.onrender.com/task/createTask`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Task Added SuccessFully");
        all_data();
        setTitle("")
        setDescription("")
        setDueDate("")
        
      })
      .catch((err) => console.log(err));
  };

  const handelDelete = (id) => {
    console.log(id);
    try {
      axios
        .delete(`https://superneutical.onrender.com/task/delete_task/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Task deleted successfully");
          all_data();
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const handelUpdate = (id) => {
    console.log(id);

    axios
      .patch(
        `https://superneutical.onrender.com/task/update_task/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res) {
          toast.success("Task updated successfully");
          all_data();
        } else {
          console.log("HELLO");
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const all_data = () => {
    axios
      .get(`https://superneutical.onrender.com/task`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res) {
          setState(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={style.container}>
      <ToastContainer position="top-center" />
      <div className={style.newForm}>
     
        <label className={style.label}>
          Sort By:
        </label>
        <br />

          <select className={style.select} value={sortBy} onChange={handleSortByChange}>
            <option value="">Select</option>
            <option value="status">Status</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        <br />

        <label className={style.label}>
          Sort Order:</label>
          <br />
          <select className={style.select} value={sortOrder} onChange={handleSortOrderChange}>
            <option value="">Select</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <br />
        
      
        {sortBy && sortOrder && (
          <button  className={style.button} type="button" onClick={handleSortSubmit}>
            Sort
          </button>
        )}
      

  





        <div>
        <h3>Create Task</h3>
        <form
          style={{ backgroundColor: "black", fontSize: "15px" ,width:"10%",flexDirection:"column"}}
          onSubmit={handleSubmit}
        >
          <div>
            <label>Title:</label>
            <input
              style={{ fontSize: "15px", fontWeight: "bold"}}
              type="text"
              id={style.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              style={{ fontSize: "15px", fontWeight: "bold" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              style={{ fontSize: "15px", fontWeight: "bold" }}
              type="date"
              format="yyyy-mm-dd"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              padding: "10px 30px",
            }}
            type="submit"
          >
            Submit
          </button>
        </form>
        </div>
      <h2 className={style.filterHeading}>Filter Box</h2>


      <form style={{width:"5%",color:"black",backgroundColor:"#D2E9E9"}} onSubmit={handleFilter}>
        <div className={style.filterOption}>
          <label style={{color:"black"}} htmlFor="status" className={style.filterLabel}>
            Status:
          </label>
          <select
          
            id="status"
            className={style.filterSelect}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="true">Completed</option>
            <option value="false">Not Completed</option>
          </select>
        </div>
        <div className={style.filterOption}>
          <label style={{color:"black"}} htmlFor="priority" className={style.filterLabel}>
            Priority:
          </label>
          <select
            id="priority"
            className={style.filterSelect}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
        <div className={style.filterOption}>
          <label style={{color:"black"}} htmlFor="dueDate" className={style.filterLabel}>
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            className={style.filterInput}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <button type="submit" className={style.filterButton}>
          Filter
        </button>
      </form>
    
      </div>
<div className={style.tableCss}>
      <h3>Users Data</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Date</th>
            <th>Status</th>
            <th>Delete</th>
            <th>Update Your Task</th>
          </tr>
        </thead>
        <tbody>
          {state?.length <= 0
            ? "No Data Available"
            : state?.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td
                    className={
                      item.priority === "HIGH"
                        ? style.redbox
                        : item.priority === "MEDIUM"
                        ? style.low
                        : style.greenbox
                    }
                  >
                    {item.priority}
                  </td>
                  <td>{item.dueDate.slice(0, 10)}</td>
                  <td className={item.status ? style.Greenbox : style.RedBox}>
                    {item.status ? "Completed" : "Not Completed"}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handelDelete(item._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handelUpdate(item._id);
                      }}
                    >
                      {item.status ? "Completed" : "Mark Complete"}
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      </div>
    </div>

  );
};
