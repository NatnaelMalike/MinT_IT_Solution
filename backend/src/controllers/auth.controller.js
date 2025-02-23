import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAuthTokens } from "../services/token.service.js";
import { ProfileDTO } from "../dtos/profile.dto.js";
import asyncMiddleware from "../middlewares/async.middleware.js";
import { refreshAuthToken } from "../services/auth.service.js";

const signup = asyncMiddleware(async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    res.status(400).json({ message: "Email already exists" });
    return;
  }
  const user = await User.create({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10),
  });
  res.status(201).json({ user: ProfileDTO.fromUser(user) });
});

const signin = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user.status !== 'active') {
    res.status(400).json({ message: 'Your account is not yet approved' });
    return
  }
  if (!user) {
    res.status(401).json({ message: "Invalid Credentials" });
    return;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: "Invalid Credentials" });
    return;
  }

  const token = await generateAuthTokens(user._id, user.role);
  res.status(200).json({ user: ProfileDTO.fromUser(user), token });
});

const refreshToken = asyncMiddleware(async (req, res) => {
  const tokens = await refreshAuthToken(req.body.refreshToken);
  res.status(200).json({ ...tokens });
});


export { signup, signin, refreshToken };
