import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import useGetCall from '../../hooks/UseGetCall';
import { useAuthContext } from '../../context/AuthContext';

const Call = () => {
  const { roomId } = useParams();
  const { authUser } = useAuthContext();
  const { loading, zegoToken } = useGetCall();

  useEffect(() => {
    if (!zegoToken) {
      console.error('No zegoToken available');
      return;
    }

    const appID = 869930223;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      appID,
      zegoToken,
      roomId,
      authUser._id,
      authUser.userName
    );

    const zegoUIKit = ZegoUIKitPrebuilt.create(kitToken);

    const roomConfig = {
      container: document.getElementById('zego-container'),
      sharedLinks: [
        {
          name: 'Personal link',
          url:
           window.location.protocol + '//' + 
           window.location.host + window.location.pathname +
            '?roomID=' +
            roomId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenshareButton: false,
    };

    zegoUIKit.joinRoom(roomConfig);
  }, [zegoToken, roomId, authUser]);

  return <div id="zego-container" style={{ width: '100%', height: '100vh' }}></div>;
};

export default Call;
