import { Server } from "socket.io";

const userSocketMap = {};
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (origin.startsWith("http://localhost")) {
          return callback(null, true);
        }

        if (origin.endsWith(".vercel.app")) {
          return callback(null, true);
        }

        return callback(new Error("Socket CORS blocked"), false);
      },
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // ✅ FIXED
    const userId = socket.handshake.auth.userId;

    console.log("✅ User connected:", socket.id, "userId:", userId);

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);

      if (userId) delete userSocketMap[userId];

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { io };
