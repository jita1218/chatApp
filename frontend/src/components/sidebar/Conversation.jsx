import React from "react";
import "./conversation.css";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <div
      className={`conversation_container ${isSelected ? "selected" : ""}`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className={`avatar ${isOnline ? "online" : ""}`}>
        <div className="avatar_container">
          <img src={conversation.profilePic} alt="user avatar" />
        </div>
      </div>
      <div className="conversation_info">
        <div className="info">
          <p
            style={{
              color: "var(--secondary-color)",
              font: "caption",
              fontSize: "20px",
            }}
          >
            {conversation.fullName}
          </p>
          <span>{emoji}</span>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
