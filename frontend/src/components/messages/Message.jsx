import React from "react";
import "./message.css";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import "daisyui/dist/full.css";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const shakeClass = message.shouldShake ? "shake" : "";
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "var(--blue-gradient)" : "var(--grey-color)";
  const textColor = fromMe ? "white" : "var(--secondary-color)";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <img
          alt="profile-pic"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
          src={profilePic}
        />
      </div>
      <div
        className={`chat-bubble ${shakeClass}`}
        style={{ background: bubbleBgColor, color: textColor }}
      >
        {message.message}
      </div>
      <div className="chat-footer">{formattedTime}</div>
    </div>
  );
};

export default Message;
