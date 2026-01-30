import { Server } from "socket.io";

const userSocketMap = {}; // userId -> socketId
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://chattara-git-master-itzroshan15-7782s-projects.vercel.app"
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // ✅ CORRECT WAY
    const userId = socket.handshake.auth?.userId;

    console.log("✅ Socket connected:", socket.id, "User:", userId);

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    // Send online users list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);

      if (userId) {
        delete userSocketMap[userId];
      }

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { io };
