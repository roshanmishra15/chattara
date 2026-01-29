import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";
import { socketRef } from "../socket";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(
    (store) => store.user.selectedUser
  );

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket || !selectedUser?._id) return;

    const handler = (msg) => {
      // show message only for active chat
      if (
        msg.senderId === selectedUser._id ||
        msg.receiverId === selectedUser._id
      ) {
        dispatch(addMessage(msg));
      }
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [dispatch, selectedUser?._id, socketRef.current]);
};

export default useGetRealTimeMessage;
