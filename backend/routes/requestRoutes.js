import express from 'express'
import { addRequest, getRequest, updateRequest, deleteRequest, getById, updateRequestStatus } from "../controllers/requestController.js";
import authorization from '../middleware/authorization.js';
const router = express.Router()

router.use(authorization)
router.get("/", getRequest);
router.get("/:id", getById);
router.post("/", addRequest);
router.put("/:id", updateRequest);
router.put("/status/:id", updateRequestStatus);
router.delete("/:id", deleteRequest);

export default router;