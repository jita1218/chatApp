import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const UseGetConversation = (token) => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include", 
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch conversations");
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message || "Failed to fetch conversations");
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [token]);

  return { loading, conversations };
};

export default UseGetConversation;
