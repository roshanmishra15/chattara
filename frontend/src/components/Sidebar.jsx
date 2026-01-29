import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUsers } from "../redux/userSlice";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const { otherUsers, allUsers } = useSelector((store) => store.user);

  // 🔐 LOGOUT
  const logoutHandler = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
        { withCredentials: true }
      );

      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");

      dispatch(setAuthUser(null));
      dispatch(setOtherUsers([]));

      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  // 🔍 SEARCH USER
  const searchSubmitHandler = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      toast.error("Please enter a username");
      return;
    }

    const conversationUser = allUsers?.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );

    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found");
    }

    setSearch("");
  };

  return (
    <div className="w-80 h-full bg-slate-900 text-slate-100 flex flex-col p-4 border-r border-slate-700">

      {/* 🔍 Search */}
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search user..."
          className="w-full px-3 py-2 rounded-md bg-slate-800 text-sm text-slate-100 placeholder-slate-400 outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="p-2 rounded-md bg-purple-600 hover:bg-purple-700 transition"
        >
          <ImSearch />
        </button>
      </form>

      <div className="my-4 h-px bg-slate-700"></div>

      {/* 👥 Users */}
      <OtherUsers />

      {/* 🚪 Logout */}
      <div className="mt-auto pt-4">
        <button
          onClick={logoutHandler}
          className="w-full py-2 text-sm rounded-md bg-purple-600 hover:bg-purple-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
