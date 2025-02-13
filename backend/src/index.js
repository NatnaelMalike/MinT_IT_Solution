import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import route404 from "./middlewares/route404.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import authRoute from './routes/auth.route.js'
import departmentRoute from './routes/department.route.js'
import professionRoute from './routes/profession.route.js'
import userRoute from './routes/user.route.js'
import reportRoute from  './routes/report.route.js'
import authMiddleware from "./middlewares/auth.middleware.js";



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
app.use('/auth',  authRoute);
// app.use(authMiddleware)
app.use('/user', userRoute)
app.use('/department', departmentRoute )
app.use('/profession',  professionRoute)
app.use('/report', reportRoute)
app.use(route404)
app.use(errorHandler)


mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("DB Connected Successfully");
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.error(`Couldn't Connect to DB`, err));

