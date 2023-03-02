const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log("req.body in registerController: ", req.body);
    // console.log("username : ", email);
    const userCheck = await User.findOne({ username });
    // console.log("userCheck : ", userCheck);
    if (userCheck)
      return res
        .status(200)
        .send({ msg: "Username is already registered", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res
        .status(200)
        .send({ msg: "Email is already registered", status: false });
    const encryptedPassword = await bcrypt.hash(password, 10);

    // console.log("encrypted password: ", encryptedPassword);

    const user = await User.create({
      username,
      email,
      password: encryptedPassword,
    });

    delete password;

    res.status(200).send({
      msg: "User registered successfully...!",
      status: true,
      data: user,
    });
  } catch (error) {
    // console.log(" error in in registerController: ", error.message);
    res.status(400).send({ msg: false });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // console.log("clg in login in controller", username, password);
    // res.status(200).send({ username: username, password: password });
    const checkUser = await userModel.findOne({ username });
    if (!checkUser)
      // return res
      //   .status(200)
      //   .send({ msg: "user found", status: true, checkUser });
      // const checkPassword = await userModel.findOne({ password
      return res.status(200).send({ msg: "user not found", status: false });
    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword)
      return res
        .status(200)
        .send({ msg: "password is incorrect", status: false });
    return res
      .status(200)
      .send({ msg: "Logged in successfully", status: true, user: checkUser });
  } catch (error) {
    // console.log(`error in login in userController`);
    res.send(400).send({ msg: error.message, status: false });
  }
};

module.exports.setAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("id gotten : ", id);
    const { image } = req.body;
    // console.log("avatar retrieved : ", image);
    await userModel.findByIdAndUpdate(id, {
      avatarImage: image,
      isAvatarImageSet: true,
    });
    const data = await userModel.findById(id);
    // console.log("clg in login in controller", username, password);
    // res.status(200).send({ username: username, password: password });
    return res
      .status(200)
      .send({ status: true, msg: "avatar image set", data });
    // return res
    //   .status(200)
    //   .send({ msg: "user found", status: true, checkUser });
    // const checkPassword = await userModel.findOne({ password
  } catch (error) {
    // console.log(`error in login in userController`);
    res.send(400).send({ msg: error.message, status: false });
  }
};

module.exports.deleteAll = async (req, res) => {
  const user = await userModel.find();
  if (user) await userModel.deleteMany();
  return res
    .status(200)
    .send({ msg: "all data deleted successfully", status: true });
};

module.exports.getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();
    // console.log("user in getAllUser : ", user);
    res.status(200).send({ msg: "all uers got", status: true, user });
  } catch (error) {
    // console.log(`error in getAllUser api in userController`);
    res.send(400).send({ msg: error.message, status: false });
  }
};
