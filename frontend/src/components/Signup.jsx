import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const navigate = useNavigate();

  const handleRadioButtons = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!user.gender) {
      toast.error("Please select gender");
      return;
    }

    try {
      const resp = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (resp.status === 201) {
        toast.success(resp.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }

    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={user.fullname}
              required
              onChange={(e) =>
                setUser({ ...user, fullname: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={user.username}
              required
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={user.password}
              required
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={user.confirmPassword}
              required
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={user.gender === "male"}
                  onChange={() => handleRadioButtons("male")}
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={user.gender === "female"}
                  onChange={() => handleRadioButtons("female")}
                />
                Female
              </label>
            </div>
          </div>

          <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
            Signup
          </button>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
