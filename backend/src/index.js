import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/config.js";
import route404 from "./middlewares/route404.middleware.js";
import {errorHandler, unExpectedErrorHandler, unHandledRejectionHandler} from "./middlewares/error.middleware.js";
import authRoute from './routes/auth.route.js'
import departmentRoute from './routes/department.route.js'
import professionRoute from './routes/profession.route.js'
import userRoute from './routes/user.route.js'
import reportRoute from  './routes/report.route.js'
import authMiddleware from "./middlewares/auth.middleware.js";
const app = express();

process.on('uncaughtException', unExpectedErrorHandler);
process.on('unhandledRejection', unHandledRejectionHandler)
mongoose
.connect(config.dbUri)
.then(() => {
    console.log("DB Connected Successfully"); 
})
.catch((err) => console.error(`Couldn't Connect to DB`, err));

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
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

const server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});




