import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
// import { setSelectedUser } from "../redux/userSlice";

function MessageContainer() {
  // const dispatch = useDispatch();
  const { selectedUser, authUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = selectedUser ? onlineUsers.includes(selectedUser._id) : false;
  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  // }, [dispatch]);

  // 1️⃣ No user selected
  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-2">
        <p>Hi {authUser?.fullName}</p>
        <p>Select a user to start chatting</p>
      </div>
    );
  }

  // 2️⃣ User selected → ALWAYS show chat UI
  return (
    <div className="flex-1 flex flex-col bg-slate-50">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white">
        <div className="relative">
          <img
            src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
            alt="User"
            className="w-11 h-11 rounded-full object-cover"
          />{
            isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            )
          }
        </div>

        <div className="flex flex-col">
          <p className="font-medium text-slate-800">
            {selectedUser.fullName}
          </p>
          <span
            className={`text-xs ${isOnline ? "text-green-500" : "text-gray-400"
              }`}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {/* Messages handles empty state */}
      <Messages />

      {/* Input ALWAYS visible */}
      <SendInput />
    </div>
  );
}

export default MessageContainer;
