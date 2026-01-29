import axios from "axios";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";

function SendInput() {
  const [text, setText] = useState("");
  const { selectedUser } = useSelector((store) => store.user);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!text.trim() || !selectedUser?._id) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/message/send/${selectedUser._id}`,
        { message: text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="px-4 py-3 border-t">
      <div className="relative">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="w-full px-4 py-3 rounded-full border"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2">
          <IoSend />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
