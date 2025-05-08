import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import route404 from "./middlewares/route404.middleware.js";
import {
  errorHandler,
  unExpectedErrorHandler,
  unHandledRejectionHandler,
} from "./middlewares/error.middleware.js";
import authRoute from "./routes/auth.route.js";
import departmentRoute from "./routes/department.route.js";
import departmentProtectedRoute from "./routes/department-protected.route.js";
import professionRoute from "./routes/profession.route.js";
import professionProtectedRoute from "./routes/profession-protected.route.js";
import userRoute from "./routes/user.route.js";
import reportRoute from "./routes/report.route.js";
import passport from "passport";
import { jwtStrategy } from "./config/passport.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();
const __dirname = path.resolve();
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

process.on("uncaughtException", unExpectedErrorHandler);
process.on("unhandledRejection", unHandledRejectionHandler);
mongoose
  .connect(config.dbUri)
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => console.error(`Couldn't Connect to DB`, err));

app.use(
  cors({
    origin: "https://mint-isuue-report-system.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRoute);
app.use("/department", departmentRoute);
app.use("/profession", professionRoute)
app.use(authMiddleware);
app.use("/user", userRoute);
app.use("/department", departmentProtectedRoute);
app.use("/profession", professionProtectedRoute);
app.use("/report", reportRoute);
app.use(route404);
app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
