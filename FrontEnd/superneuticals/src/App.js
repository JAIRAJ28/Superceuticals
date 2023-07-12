import logo from './logo.svg';
import './App.css';
import { Login } from './Components/Pages/Login';
import { Signup } from './Components/Pages/Signup';
import { useContext } from 'react';
import { AuthContext } from './AuthContext/AuthProvider';
import { Links2 } from './All_Links/Links2';
import { Links1 } from './All_Links/Links1';
import { All_Routes } from './All_Routes/Routes';


function App() {
  let {auth,setAuth,handelAuth,name,setToken,token}=useContext(AuthContext)
  console.log(auth)
  return (
    <div className="App">
      <div className='Navbar'>
     {auth?<Links1/>:<Links2/>}
     </div>
     <All_Routes/>
    </div>
     
  );
}

export default App;
