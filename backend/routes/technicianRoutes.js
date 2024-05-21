import express from "express";
import {
    getTechnician,
    addTechnician,
    updateTechnician,
    deleteTechnician,
    getById,
} from "../controllers/technicianController.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.get("/",  getTechnician);
router.get('/:id', getById)
router.post("/", addTechnician);
router.put("/:id", updateTechnician);
router.delete("/:id", deleteTechnician);

export default router;
