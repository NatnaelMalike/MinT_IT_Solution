import User from "../models/user.model.js";
import { isValidObjectId } from "mongoose";
import {
  changePasswordSchema,
  editProfileSchema,
} from "../validations/user.validation.js";
import bcrypt from "bcrypt";
import { ProfileDTO } from "../dtos/profile.dto.js";

const getUsers = async (req, res) => {
  const users = await User.find();

  const profiles = users.map((user) => ProfileDTO.fromUser(user));

  res.status(200).json(profiles);
};

const getUserById = async (req, res) => {
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

  res.status(200).json(ProfileDTO.fromUser(user));
};

const getCurrentUser = async (req, res) => {
  
  const { _id: id } = req.body.user;

  const user = await User.findById(id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(ProfileDTO.fromUser(user));
};

const editProfile = async (req, res) => {
  let newReqBody = {};
  newReqBody = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    department: req.body.department,
  };

  const { error } = editProfileSchema.body.validate(newReqBody);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  if (!isValidObjectId(req.body.profession)) {
    res.status(400).json({ message: "Invalid Profession id." });
    return;
  }
  if (req.body.user.role === "TechnicianUser") {
    newReqBody = { ...newReqBody, profession: req.body.profession };
  } else {
    newReqBody = { ...newReqBody, profession: "None" };
  }

  const user = await User.findByIdAndUpdate(req.body.user._id, newReqBody, {
    new: true,
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.status(200).json(ProfileDTO.fromUser(user));
};

const changePassword = async (req, res) => {
  const { error } = changePasswordSchema.body.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.body.user._id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  if (!(await bcrypt.compare(oldPassword, user.password))) {
    res.status(400).json({ message: "Incorrect password." });
    return;
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.status(200).json({ message: "Password changed successfully" });
};

const deleteUser = async (req, res) => {
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
};

export {
  getUsers,
  getUserById,
  getCurrentUser,
  editProfile,
  changePassword,
  deleteUser,
};
