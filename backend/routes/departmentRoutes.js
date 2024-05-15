import { getDepartment } from "../controllers/departmentController.js";
import express from "express";
const router = express.Router();
router.get("/", getDepartment);
export default router;
