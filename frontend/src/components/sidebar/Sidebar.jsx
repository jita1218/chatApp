import React ,{useEffect,useState}from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogOutButton from './LogOutButton';
import './sideBar.css';
import useConversation from '../../zustand/useConversation.js';

const Sidebar = () => {
  const { selectedConversation } = useConversation();
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
    <div className='sidebar_container' style={{ display: selectedConversation && isPhoneScreen ? 'none' : 'block' }}>
        <SearchInput />
        <Conversations />
        <LogOutButton />
    </div>
  );
};

export default Sidebar;
