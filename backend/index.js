import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./routes/userRoutes.js";
import admins from './routes/adminRoutes.js';
import technicians from './routes/technicianRoutes.js'
dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/user", users);
app.use("/api/admin", admins);
app.use("/api/technician", technicians);


mongoose
    .connect(`mongodb://localhost:27017/MinT_IT_Solution`)
    .then(() => {
        console.log("DB Connected Successfully");
        app.listen(process.env.PORT,() => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log(`Couldn't Connect to DB`, err));
