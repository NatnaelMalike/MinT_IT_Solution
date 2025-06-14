import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateAuthToken,
  generateInviteToken,
} from "../services/token.service.js";
import { ProfileDTO } from "../dtos/profile.dto.js";
import asyncMiddleware from "../middlewares/async.middleware.js";
import sendEmail from "../services/email.service.js";
import inviteEmail from "../utils/inviteEmail.js";
import config from "../config/config.js";

const signup = asyncMiddleware(async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }
  console.log("role",req.body.role);
  const user = await User.create({
    ...req.body,
    
    password: await bcrypt.hash(req.body.password, 10),
  });

  res.status(201).json({ user: ProfileDTO(user) });
});

const signin = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate("department").populate("profession");
  
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: "Invalid Credentials" });
    return;
  }
  if (!user) {
    res.status(401).json({ message: "Invalid Credentials" });
    return;
  }

  if (user.status !== "active") {
    res.status(400).json({ message: "Your account is not yet approved" });
    return;
  }


  const token = generateAuthToken(user._id, user.role);

  res.status(200).json({ user: ProfileDTO(user), token });
});

const InviteToken = asyncMiddleware(async (req, res) => {
  const { role, email, name } = req.body;

  const allowedRoles = ["HelperAdmin", "TechnicianUser"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role in invite link" });
  }

  const token = await generateInviteToken(role);
  const inviteLink = `${config.frontendUrl}/signup?token=${token}`;
  const htmlContent = inviteEmail(name, role, inviteLink);
  await sendEmail(email, "Invite Link", htmlContent);
  res.status(200).json({ message: "Invite link sent successfully" });
});

export { signup, signin, InviteToken };

