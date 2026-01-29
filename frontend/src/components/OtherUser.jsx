import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

function OtherUser({ user }) {
  const dispatch = useDispatch();

  const { selectedUser, onlineUsers = [] } =
    useSelector((store) => store.user);

  const isOnline = onlineUsers.some(
  (id) => String(id) === String(user._id)
);


  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={selectedUserHandler}
      className={`flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition
        ${
          selectedUser?._id === user?._id
            ? "bg-slate-800"
            : "hover:bg-slate-800"
        }
      `}
    >
      {/* Avatar */}
      <div className="relative">
        <img
          src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001877.png"
          alt="User"
          className="w-11 h-11 rounded-full object-cover"
        />

        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
        )}
      </div>

      {/* User info */}
      <div className="flex flex-col flex-1">
        <p className="font-medium text-sm text-slate-100">
          {user.fullName}
        </p>
      </div>
    </div>
  );
}

export default OtherUser;
