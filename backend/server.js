import path from "path";
import express from "express";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes.js';
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

app.get('/', (req, res) => {
    // root route http://localhost:8000/
    // res.send('Hello World');
});

// Configure CORS to allow multiple origins
const allowedOrigins = ['http://localhost:3000', 'https://chatapp-ovgs.onrender.com'];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

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
