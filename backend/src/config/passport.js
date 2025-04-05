import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { tokenTypes } from "./tokens.js";
import User from "../models/user.model.js";
import config from "./config.js";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {

    const user = await User.findById(payload.userId);
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
