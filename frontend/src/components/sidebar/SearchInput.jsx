import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./sideBar.css";
import toast from "react-hot-toast";
import useConversation from "../../zustand/useConversation";
import UseGetConversation from "../../hooks/UseGetConversation";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = UseGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search query must be at least 3 characters long");
    }

    const conversation = conversations.find((conv) =>
      conv.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No user found with that name");
    }
  };

  return (
    <div className="search_input">
      <form onSubmit={handleSubmit} className="form_container">
        <input
          type="text"
          placeholder="Search…"
          className="input_bar"
          style={{
            borderRadius: "2rem",
            marginLeft: "1rem",
            font: "var(--body-font)",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="button">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
