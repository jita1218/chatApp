import { getRandomEmoji } from "../../utils/emoji";
import Conversation from "./Conversation";
import './conversation.css';
import  UseGetConversation  from "../../hooks/UseGetConversation";
import { useAuthContext } from "../../context/AuthContext";

const Conversations = () => {
	const { token } = useAuthContext();

	const { loading, conversations } = UseGetConversation(token);
	console.log("conversations",conversations);
	return (
		<div className='convo_container'>
			{conversations.map((conversation) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
	);
};
export default Conversations;
