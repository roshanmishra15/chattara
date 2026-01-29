import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/database.js";
import userRoute from "./Routes/userRoutes.js";
import messageRoute from "./Routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

// 🔥 IMPORTANT: import socket initializer
import { initSocket } from "./socket/socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3200;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  connectdb();
  console.log(`✅ Server running on port ${PORT}`);
});
