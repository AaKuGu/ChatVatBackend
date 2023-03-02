const {
  getMessages,
  postMessages,
  deleteAllMessages,
} = require("../controllers/messageController");

const messageRouter = require("express").Router();

messageRouter.post("/getMessages", getMessages);
messageRouter.post("/postMessages", postMessages);
messageRouter.delete("/deleteAllMessages", deleteAllMessages);

module.exports = messageRouter;
