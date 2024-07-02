import path from "path";
import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';
import connectToMongoDB from "./db/connectToMongoDB.js"
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from './socket/socket.js';
import callRoutes from "./routes/callRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

// Use FRONTEND_URL for CORS
const FRONTEND_URL = process.env.FRONTEND_URL ;

const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/call", callRoutes);

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
});
