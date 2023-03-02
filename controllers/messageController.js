const messageModel = require("../model/messageModel");

module.exports.postMessages = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    // console.log("data in postMessages : ", data);

    if (data)
      return res
        .status(200)
        .json({ msg: "Message created successfully", status: "true", data });

    // console.log("error");
    return res
      .status(200)
      .json({ msg: "Message could not be created", status: "false" });
  } catch (error) {
    // console.log("error in catch", error.message);
    res
      .status(400)
      .send({ msg: "Error", status: "false", error: error.message });
  }
};

module.exports.getMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    // console.log("messages in getMessages", messages);

    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    // console.log("projectMessages", projectMessages);
    res.status(200).send({
      msg: "got all teh messages",
      status: true,
      data: projectMessages,
    });
  } catch (error) {
    // console.log("error in catch", error.message);
    res
      .status(400)
      .send({ msg: "Error", status: "false", error: error.message });
  }
};

module.exports.deleteAllMessages = async (req, res) => {
  try {
    const data = await messageModel.deleteMany();

    res
      .status(200)
      .send({ status: true, msg: "All Messages deleted successfully" });
  } catch (error) {
    // console.log("error in catch", error.message);
    res
      .status(400)
      .send({ msg: "Error", status: "false", error: error.message });
  }
};
