import { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext'; // Adjust the path as per your project structure

const useGetCall = () => {
    const [loading, setLoading] = useState(false);
    const [zegoToken, setZegoToken] = useState(null);
    const { authUser } = useContext(AuthContext);

    useEffect(() => {
        const getCallToken = async () => {
            setLoading(true);
            try {
                if (!authUser || !authUser._id) {
                    throw new Error('UserID is undefined');
                }

                const userID = authUser._id;
                console.log('Fetching token for userID:', userID);
                const res = await fetch("http://localhost:8000/api/call/zegotoken", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userID }),
                    credentials: 'include',
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Failed to generate token');
                }

                const data = await res.json();
                console.log('Token response data:', data);
                if (data.zegoToken) {
                    setZegoToken(data.zegoToken);
                } else {
                    throw new Error('Token not found in response');
                }
            } catch (error) {
                toast.error(error.message || 'Failed to fetch token');
            } finally {
                setLoading(false);
            }
        };

        if (authUser && authUser._id) {
            getCallToken();
        }
    }, [authUser]);

    return { loading, zegoToken };
};

export default useGetCall;
