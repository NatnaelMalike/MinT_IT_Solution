import { tokenTypes } from "../config/tokens.js";
import Token from "../models/token.model.js";
import User from "../models/user.model.js";
import { generateAuthTokens, verifyToken } from "./token.service.js";

const refreshAuthToken = async (refreshToken) => {
    try {
      const refreshTokenDoc = await verifyToken(
        refreshToken,
        tokenTypes.REFRESH
      );
      const user = await User.findById(refreshTokenDoc.user);
      if (!user) {
        throw new Error();
      }
      await Token.findByIdAndDelete(refreshTokenDoc._id);
      return generateAuthTokens(user.id);
    } catch (error) {
        error.status = 401
        error.message = "Please authenticate"
        throw error;
    }
  };
export {refreshAuthToken}