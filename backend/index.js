import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./routes/userRoutes.js";
import admins from "./routes/adminRoutes.js";
import technicians from "./routes/technicianRoutes.js";
import department from "./routes/departmentRoutes.js";
import request from "./routes/requestRoutes.js";
import login from "./routes/auth.js";
import assignTechnician from "./routes/assignmentRoutes.js";
import forgotPassword from "./routes/forgotPassword.js"

import authorize from "./middleware/authorization.js";
import cors from "cors";

import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi);

dotenv.config();
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET, POST, PUT, DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());
app.use("/api/login", login);
app.use("/user", forgotPassword);
app.use("/api/user", users);
app.use("/api/admin", admins);
app.use("/api/technician",  technicians);
app.use("/api/department",  department);
app.use("/api/request", request);
app.use("/api/assign_technician",  assignTechnician);

mongoose
    .connect(`mongodb://localhost:27017/MinT_IT_Solution`)
    .then(() => {
        console.log("DB Connected Successfully");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(`Couldn't Connect to DB`, err));
