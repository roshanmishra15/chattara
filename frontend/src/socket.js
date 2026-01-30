import { io } from "socket.io-client";

/**
 * Single global socket reference
 * ✅ NOT in Redux
 * ✅ NOT in component state
 */
export const socketRef = {
  current: null,
};

const SOCKET_URL = import.meta.env.VITE_API_URL;

export const connectSocket = (userId) => {
  if (!userId) return;

  // 🔥 prevent duplicate connections
  if (socketRef.current) return;

  socketRef.current = io(SOCKET_URL, {
    transports: ["websocket"],
    withCredentials: true,
    auth: {
      userId, // ✅ MUST MATCH backend: socket.handshake.auth.userId
    },
  });

  socketRef.current.on("connect", () => {
    console.log("✅ Socket connected:", socketRef.current.id);
  });

  socketRef.current.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });
};

export const disconnectSocket = () => {
  if (!socketRef.current) return;

  socketRef.current.disconnect();
  socketRef.current = null;
};
