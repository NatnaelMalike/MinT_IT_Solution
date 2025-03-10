import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  dbUri: process.env.DB_URI,
  env: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_ACCESS_EXPIRY,
    r_expiry: process.env.JWT_REFRESH_EXPIRY,
    invite: process.env.JWT_INVITE,
  },
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,
  frontendUrl: process.env.FRONTEND_URL,
};
