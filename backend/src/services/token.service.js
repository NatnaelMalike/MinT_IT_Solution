import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateAuthToken = (userId, role) => {
  const payload = {
    role,
    userId,
  };
  return jwt.sign(payload, config.jwt.secret,{expiresIn: '3d'});
};

const generateInviteToken = async (role) => {
  return jwt.sign({ role }, config.jwt.invite, { expiresIn: "1d" });
};

const verifyInviteToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.invite);
  const { role } = payload;
  if (role !== "HelperAdmin" && role !== "TechnicianUser") {
    res.status(400).json({ message: "Invalid role in invite link" });
    return;
  }
  return role;
};

export {
  generateAuthToken,
  generateInviteToken,
  verifyInviteToken,
};
