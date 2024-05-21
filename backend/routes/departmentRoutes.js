import {
    getDepartment,
    updateDepartment,
    deleteDepartment,
    addDepartment,
    getById,
} from "../controllers/departmentController.js";
import express from "express";
const router = express.Router();
router.get("/", getDepartment);
router.get("/:id", getById);
router.post("/", addDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

export default router;
