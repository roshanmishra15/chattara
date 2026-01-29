import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3200/api/v1/message/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // 🔥 SAFE
        dispatch(setMessages(res.data?.conversation?.messages || []));
      } catch (error) {
        console.error("Fetch messages failed:", error);
        dispatch(setMessages([]));
      }
    };

    fetchMessages();
  }, [userId, dispatch]);
};

export default useGetMessages;
