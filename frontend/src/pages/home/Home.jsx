import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import { useState,useEffect } from 'react';
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

  const [isPhoneScreen, setIsPhoneScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsPhoneScreen(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <div className='home_container'>
      <div className="call_container "  style={{ display: <Sidebar /> && isPhoneScreen ? 'none' : 'block' }}>
        <a href={startCallURL()} target="_blank" rel="noopener noreferrer">
          <MdVideoCall className="call_btn" style={{ fontSize: '2.5rem', color:"var(--blue-color)" }} />
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
