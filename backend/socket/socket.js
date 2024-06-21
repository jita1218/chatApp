import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000"],
        methods:["GET","POST"]
    }
});

export const  getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {};//{userId:socketId}
//socket - which is the user id for  sending and getting msg at real time

io.on("connection",(socket)=>{
    console.log("a user Connected",socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != 'undefined'){
        userSocketMap[userId] = socket.id;
    }

    //io.emit() is used to send the message to all the connected users
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    //soccket.on id used tolisten to the event, and the 2nd argument is the callback function from both side
    socket.on("disconnect",()=>{
        console.log("a user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})
export {app,io,server}