import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { setOnlineUsers } from "./redux/userSlice";
import { connectSocket, disconnectSocket, socketRef } from "./socket";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

/* ROUTES */
const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <Home /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Signup /> },
]);


function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authUser?._id) return;

    // ✅ CONNECT SOCKET (ONLY HERE)
    connectSocket(authUser._id);

    // ✅ ONLINE USERS LISTENER
    socketRef.current?.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socketRef.current?.off("getOnlineUsers");
      disconnectSocket();
    };
  }, [authUser?._id, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
