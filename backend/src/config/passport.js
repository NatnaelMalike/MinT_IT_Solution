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
    if (payload.type !== tokenTypes.ACCESS) {
      return done(new Error("Invalid token type"), false);
    }

    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

export const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
