import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateAuthTokens,
  generateInviteToken,
} from "../services/token.service.js";
import { ProfileDTO } from "../dtos/profile.dto.js";
import asyncMiddleware from "../middlewares/async.middleware.js";
import { refreshAuthToken } from "../services/auth.service.js";
import sendEmail from "../services/email.service.js";
import inviteEmail from "../utils/inviteEmail.js";
import config from "../config/config.js";
import Token from "../models/token.model.js";

const signup = asyncMiddleware(async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const user = await User.create({
    ...req.body,
    role,
    password: await bcrypt.hash(req.body.password, 10),
  });

  res.status(201).json({ user: ProfileDTO.fromUser(user) });
});

const signin = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ message: "Invalid Credentials" });
    return;
  }
  
  if (user.status !== "active") {
    res.status(400).json({ message: "Your account is not yet approved" });
    return;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: "Invalid Credentials" });
    return;
  }

  const token = await generateAuthTokens(user._id, user.role);
  res.cookie('refreshToken', token.refresh, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    path: '/',
  });
  res.status(200).json({ user: ProfileDTO.fromUser(user), accessToken: token.access.token });
});

const refreshToken = asyncMiddleware(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ message: "No refresh token provided" });
    return;
  }
  const tokens = await refreshAuthToken(refreshToken);
  res.cookie("refreshToken", tokens.refresh, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: "/",
  });
  res.status(200).json(tokens.access);
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

const logout = asyncMiddleware(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(204).json({ message: "No refresh token provided" });
    return;
  }
      await Token.findOne(refreshToken);
      res.clearCookie("refreshToken", {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
      });
    
    res.status(204).json({ message: "Logged out successfully" });
})

export { signup, signin, refreshToken, InviteToken, logout };
