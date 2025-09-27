import Users from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  let { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);

  const encryptedPassword = await bcrypt.hash(password, salt);

  const userExists = await Users.findOne({ email: email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await Users.create({
    name,
    email,
    password: encryptedPassword,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  const user = await Users.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({ message: "logout success" });
});

// Only for admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await Users.find();
  res.json(users);
});

// Only for admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can not delete Admin");
    }
    await Users.deleteOne({ _id: user._id });

    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Only for admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Only for admin

const updateUser = asyncHandler(async (req, res) => {
  const { name, email, isAdmin } = req.body;

  const user = await Users.findById(req.params.id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = Boolean(isAdmin) || user.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await Users.findById(req.user._id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);

      const encryptedPassword = await bcrypt.hash(password, salt);

      user.password = encryptedPassword;
    }

    const newUser = await user.save();

    res.json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  updateUserProfile,
};
