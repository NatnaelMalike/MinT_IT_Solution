import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT || 4000,
    dbUri: process.env.DB_URI,
    env: process.env.NODE_ENV || "development",
    jwt:{
        secret: process.env.JWT_SECRET,
        expiry: process.env.JWT_EXPIRY || "1d",
    }

}