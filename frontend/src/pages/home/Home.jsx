import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import MessageContainer from '../../components/messages/Messagecontainer';
import { MdVideoCall } from "react-icons/md";
import { useAuthContext } from '../../context/AuthContext';

const Home = () => {
  const { authUser } = useAuthContext();

  const startCallURL = () => {
    if (authUser) {
      const roomId = `room_${authUser._id}`;
      return `/call/${roomId}`;
    }
    return '#';
  };

  return (
    <div className='home_container'>
      <div className="call_container">
        <a href={startCallURL()} target="_blank" rel="noopener noreferrer">
          <MdVideoCall className="call_btn" style={{ fontSize: '2.5rem' }} />
        </a>
      </div>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="message">
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
