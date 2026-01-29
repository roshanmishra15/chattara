import { io } from "socket.io-client";

/**
 * Single global socket reference
 * ❌ NOT in Redux
 * ❌ NOT in component state
 */
export const socketRef = {
  current: null,
};

export const connectSocket = (userId) => {
  if (!userId) return;

  // 🔥 prevent duplicate connections
  if (socketRef.current) return;

  socketRef.current = io("http://localhost:3200", {
    transports: ["websocket"],
    query: { userId },
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
