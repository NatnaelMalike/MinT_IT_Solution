import { addRequest, getRequest, updateRequest, deleteRequest } from "../controllers/requestController.js";
import express from 'express'
const router = express.Router()
router.get("/", getRequest);
router.post("/", addRequest);
router.put("/:id", updateRequest);
router.delete("/:id", deleteRequest);

export default router;