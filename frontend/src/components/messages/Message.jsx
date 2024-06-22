import React from "react";
import "./message.css";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import 'daisyui/dist/full.css';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { SelectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const shakeClass = message.shouldShake ? "shake" : "";
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : (SelectedConversation?.profilePic || '' );
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-300'; // Fallback color for other user's messages

  return (
    <div className={`chat ${chatClassName} `}>
      <div className="chat-image avatar">
        <img
          alt="profile-pic"
          style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          src={profilePic}
        />
      </div>

      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`} style={{ backgroundColor: bubbleBgColor }}>
        {message.message}
      </div>
      <div className="chat-footer">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
