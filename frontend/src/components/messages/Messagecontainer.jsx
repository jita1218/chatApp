import React, { useEffect } from 'react';
import useConversation from '../../zustand/useConversation.js';
import MessageInput from './MessageInput.jsx';
import Messagebar from './Messagebar.jsx';
import './message.css';
import { TiMessages } from 'react-icons/ti';
import { useAuthContext } from '../../context/AuthContext.jsx';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
	
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  

  return (
    <div className='msg_container'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className='header'>
            <span style={{ fontSize: '2.5rem' }}>To:</span>
            <span style={{ fontSize: '2.5rem' }}>{selectedConversation.fullName}</span>
          </div>
          <Messagebar />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="nochat-container">
      <div className="nochat">
        <p style={{ fontSize: '20px' }}>Welcome👋 {authUser.fullName} ❄</p>
        <p style={{ fontSize: '20px' }}>Select a chat to start messaging <TiMessages style={{ fontSize: '30px' }} /></p>
      </div>
    </div>
  );
};
