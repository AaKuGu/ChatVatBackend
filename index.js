const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { dbConnection } = require("./db/dbConnection");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const socket = require("socket.io");
// const { check } = require("./config/config");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT;

dbConnection(process.env.MONGO_URL);

app.get("/", (req, res) => {
  res.status(200).send({ msg: "server is working fine", status: true });
});

app.use("/api/auth", userRouter);
app.use("/api/message", messageRouter);

const server = app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: false,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    // console.log("add-user : ", userId);
    onlineUsers.set(userId, socket.id);
  });
  // console.log("reached to socket");
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    console.log("reached to socket if", data);

    if (sendUserSocket) {
      // console.log("msg-receive socket if : ", data.message);
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});

// working code

// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.status(200).send("hii this is working");
// });

// const PORT = 8000;

// app.listen(PORT, () => {
//   console.log("server running");
// });
