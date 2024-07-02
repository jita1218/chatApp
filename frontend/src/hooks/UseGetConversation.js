import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const UseGetConversation = (token) => { // Pass token as a parameter
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect (() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users", {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the headers
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include' // Optional: If using cookies for authentication
                });

                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || 'Failed to fetch conversations');
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message || 'Failed to fetch conversations');
            } finally {
                setLoading(false);
            }
        };

        
            getConversations();
        
    
    }, [token]); // Run effect whenever token changes

    return { loading, conversations };  
}

export default UseGetConversation;
