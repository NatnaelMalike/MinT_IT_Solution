import User from "../models/user.model.js";
import { isValidObjectId } from "mongoose";

import { ProfileDTO } from "../dtos/profile.dto.js";
import asyncMiddleware from "../middlewares/async.middleware.js";

const getUsers = asyncMiddleware(async (req, res) => {
  const users = await User.find();
  const profiles = users.map((user) => ProfileDTO(user));
  res.status(200).json(profiles);
});

const getUserById = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid user id." });
    return;
  }

  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }

  res.status(200).json(ProfileDTO(user));
});

const getCurrentUser = asyncMiddleware(async (req, res) => {
  const { _id:id} = req.user;
  const user = await User.findById(id).populate("department");
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(ProfileDTO(user));
});

const editProfile = asyncMiddleware(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(ProfileDTO(user));
});

// const changePassword = async (req, res) => {
//   const { error } = changePasswordSchema.body.validate(req.body);
//   if (error) {
//     res.status(400).send(error.details[0].message);
//     return;
//   }
//   const { oldPassword, newPassword } = req.body;

//   const user = await User.findById(req.body.user._id);
//   if (!user) {
//     res.status(404).json({ message: "User not found" });
//     return;
//   }

//   if (!(await bcrypt.compare(oldPassword, user.password))) {
//     res.status(400).json({ message: "Incorrect password." });
//     return;
//   }
//   user.password = await bcrypt.hash(newPassword, 10);
//   await user.save();
//   res.status(200).json({ message: "Password changed successfully" });
// };

const deleteUser = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid user id." });
    return;
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }
  res.status(200).json({ message: "User deleted successfully." });
});

const approveUser = asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  user.status = "active";
  await user.save();
  res.status(200).json({ message: "User approved successfully" });
});

export {
  approveUser,
  getUsers,
  getUserById,
  getCurrentUser,
  editProfile,
  deleteUser,
  
};
