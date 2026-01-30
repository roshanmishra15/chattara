import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/database.js";
import userRoute from "./Routes/userRoutes.js";
import messageRoute from "./Routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3200;

/* =======================
   MIDDLEWARES
======================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (origin.startsWith("http://localhost")) {
        return callback(null, true);
      }

      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =======================
   ROUTES
======================= */

app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

/* =======================
   SERVER
======================= */

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  connectdb();
  console.log(`✅ Server running on port ${PORT}`);
});
