import { assignTechnician, getAssignedRequests } from "../controllers/assignmentController.js";
import express from "express"
import authorization from '../middleware/authorization.js';

const router = express.Router()

router.use(authorization)
router.post("/", assignTechnician)
router.get("/",getAssignedRequests)

export default router
