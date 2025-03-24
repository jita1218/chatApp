import React, { useEffect, useState } from 'react';
import useConversation from '../../zustand/useConversation.js';
import MessageInput from './MessageInput.jsx';
import Messagebar from './Messagebar.jsx';
import './message.css';
import { TiMessages } from 'react-icons/ti';
import { useAuthContext } from '../../context/AuthContext.jsx';


const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsPhoneScreen(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      setSelectedConversation(null);
    };
  }, [setSelectedConversation]);

  return (
    <div className='msg_container' style={{ display: selectedConversation || !isPhoneScreen ? 'block' : 'none' }}>
      {selectedConversation ? (
        <>
          <div className='header'>
            <img
            src={selectedConversation.profilePic}
			alt='user avatar'
      style={{margin:"0.5rem"}}
    						/>
            <span className='to'>{selectedConversation.fullName}</span>
            <button onClick={() => setSelectedConversation(null)} style={{ fontSize: '1rem', margin: '0  0 0 auto', marginRight:'1rem',color:'var(--secondary-color) '}}>Back</button>

          </div>
          <Messagebar />
          <MessageInput />
        </>
      ) : (
        !isPhoneScreen && <NoChatSelected />
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="nochat-container">
      <div className="nochat" >
        <p style={{ fontSize: '30px', fontFamily:'initial' ,color:'var(--secondary-color)'}}>Welcome👋 {authUser.fullName} ❄</p>
        <p style={{ fontSize: '20px' ,fontFamily:'revert-layer',color:'var(--secondary-color)'}}>Select a chat to start messaging <TiMessages style={{ fontSize: '40px' }} /></p>
      </div>
    </div>
  );
};
