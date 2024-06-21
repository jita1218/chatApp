import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogOutButton from './LogOutButton'
import './sideBar.css';

const Sidebar = () => {
  return (
    <div className='sidebar_container '>
        <SearchInput/>
        <Conversations/>
        <LogOutButton/>
    </div>
  )
}

export default Sidebar
