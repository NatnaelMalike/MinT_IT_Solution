import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import config from "../config/config.js";
import { tokenTypes } from "../config/tokens.js";
import Token from "../models/token.model.js";
import asyncMiddleware from "../middlewares/async.middleware.js";

const generateToken = (userId, role, expires, type) => {
  const payload = {
    role,
    sub: userId,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, config.jwt.secret);
};

const generateAuthTokens = async (userId, role) => {
  const accessTokenExpires = dayjs().add(config.jwt.expiry, "minutes");
  const accessToken = generateToken(
    userId,
    role,
    accessTokenExpires,
    tokenTypes.ACCESS
  );
  const refreshTokenExpires = dayjs().add(config.jwt.r_expiry, "days");
  const refreshToken = generateToken(
    userId,
    role,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    user: payload.sub,
    type,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
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
  generateAuthTokens,
  saveToken,
  verifyToken,
  generateInviteToken,
  verifyInviteToken,
};
