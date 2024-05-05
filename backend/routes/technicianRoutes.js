import express from "express";
import {
    getTechnician,
    addTechnician,
    updateTechnician,
    deleteTechnician,
} from "../controllers/technicianController.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.get("/", admin,  getTechnician);
router.post("/", admin, addTechnician);
router.put("/:id", admin, updateTechnician);
router.delete("/:id", admin, deleteTechnician);

export default router;
