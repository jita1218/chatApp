import React from 'react'
import { SlLogout } from "react-icons/sl";
import UseLogOut from '../../hooks/UseLogout';
import './sideBar.css'

const LogOutButton = () => {

  const {loading, logout} = UseLogOut();
  return (
    <div className='logout'>
      {!loading ?(
        <button onClick={logout}>
          <SlLogout />
        </button>
      ):(
        <button>
          <span className='loading loading-spinner' style={{fontSize:"20px"}}></span>
        </button>
      )}
    </div>
  );
};

export default LogOutButton
