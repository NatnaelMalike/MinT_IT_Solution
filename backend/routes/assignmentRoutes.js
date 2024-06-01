import { assignTechnician } from "../controllers/assignmentController.js";
import express from "express"

const router = express.Router()
router.post("/", assignTechnician)

export default router
