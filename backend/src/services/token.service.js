import jwt from "jsonwebtoken";
import dayjs from "dayjs"
import config from "../config/config.js";

const generateAuthToken = (
  _id,
  role,
) => {
  const payload = {
    role,
    sub: _id,
    iat: dayjs().unix(),
    exp: dayjs().add(config.jwt.expiry, 'minutes').unix(), // Expires in 30 minutes
    type: tokenTypes.ACCESS, 
  };
  return jwt.sign(payload, config.jwt.secret);
};
export { generateAuthToken };
