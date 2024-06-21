import {  Route ,Routes,Navigate } from 'react-router-dom'
import React from "react";
import "./App.css";
import Home from "./pages/home/Home.jsx";
import {Toaster} from 'react-hot-toast';
import Login from "./pages/login/Login.jsx";
import Signup from './pages/login/Signup.jsx';
import { useAuthContext } from './context/AuthContext';
import 'daisyui/dist/full.css';

const App = () => {
  const {authUser} = useAuthContext();
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to= '/login' />}/>
        <Route path='/login' element={authUser ? <Navigate to= '/' /> : <Login/>}/>
        <Route path='/signup' element={ authUser ? <Navigate to= '/' /> : <Signup/>}/>
      </Routes>
    <Toaster/>
        </div>
  );
};

export default App;
