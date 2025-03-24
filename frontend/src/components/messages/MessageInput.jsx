import { BsSend } from "react-icons/bs";
import './message.css';
import { useState } from 'react';
import UseSendMessage from "../../hooks/UseSendMessage";

 const MessageInput = () => {
	const [message, setMessage] = useState("");
  const { loading, sendMessage } = UseSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }
 	return (
 		<form className='msg_input' onSubmit={handleSubmit}>
 			<div className='msg'>
 				<input
 					type='text'
 					className='sending_message'
 					placeholder='   Send a message'
					 value={message}
					 onChange={(e) => setMessage(e.target.value)}
				  
 				/>
 				
 			</div>
             <button type='submit' className='send_btn' style={{backgroundColor:"var(--blue-color)"}}>
			 {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BsSend style={{ width: "2rem", height: "2rem" }} />
          )} 				</button>
 		</form>
 	);
 };
export default MessageInput;