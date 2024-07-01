import UseGetMessages from "../../hooks/UseGetMessages";
import Message from "./Message";
import './message.css';
import { useAuthContext } from "../../context/AuthContext";
import { useEffect,useRef } from "react";
import UseListenMessages from "../../hooks/UseListenMessages";

 const Messagebar = () => {
	const {token} = useAuthContext();
	const {messages , loading} = UseGetMessages(token);
	UseListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
		lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
		},1000);

	},[messages]);
 	return (
 		<div className='msg_bar '>
			{!loading && messages.length > 0 && messages.map((message) => (
				<div key={message._id}
				ref={lastMessageRef}>
				<Message  message={message} />
				</div>
			))}
			{loading && <p>Loading...</p>}
		{!loading && messages.length === 0 && (
			<p>Send a message to start the conversation</p>
		)
		}
 		</div>
 	);
 };
 export default Messagebar;