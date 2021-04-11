const User = require("../models/user");
const bcrypt = require("bycryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).send("Please provide all fields.");
  }

  const userExists = await User.findOne({ email });
  if (userExist) {
    return res.status(400).send("Email already exist.");
  }

  const hashedPassword = await bycrypt.hash(password, 20);

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });
  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //check for user in DB
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Invalid!");
  }

  //comparing password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid");
  }

  const token = jwt.sign({ id: user._id }, "123456", { expiresIn: "1h" });

  //token
  res.status(200).json({ token });
};

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Not Authorized." });
  }

  token = token.split(" ")[1];
  try {
    let user = jwt.verify(token, "123456");
    req.user = user.id;
    return next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }

  next();
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
