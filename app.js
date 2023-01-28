const express = require('express');
// const bodyparser = require('body-parser')
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
app.use(express.static(__dirname + '/userImages'))
app.use(cors());
app.use(express.urlencoded({extended:true}))

app.use(express.json());
require('./dbConnection/database');

const patientRouter = require('./routers/patientRouter');
const salonRouter = require('./routers/salonRouter');
const appointmentRouter = require('./routers/appointmentRouter')
const staffRouter = require('./routers/staffRouter')
const conversationRouter = require("./routers/conversationsRouter")
const messageRouter = require("./routers/messagesRouter")
const adminRouter = require("./routers/adminRouter")
app.use(patientRouter);
app.use(salonRouter);
app.use(appointmentRouter);
app.use(staffRouter);
app.use(conversationRouter);
app.use(messageRouter);
app.use(adminRouter);



const io = require("socket.io")(8900, {
    pingTimeout : 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };
  
  io.on("connection", (socket) => {
    //when ceonnect
    console.log("a user connected.");
  
    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
  
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });
  
    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });



app.listen(90);  

module.exports = app;