import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
// import Message from '../../components/messages/Message';
import './home.css';
import MessageContainer from '../../components/messages/Messagecontainer';


const Home = () => {
  return (
    <div className='home_container'>
      <div className="sidebar">
      <Sidebar />
      </div>
       <div className="message">
       <MessageContainer />
       </div>
        
    </div>
  );
};

export default Home
