import express from "express";
import {
    getTechnician,
    addTechnician,
    updateTechnician,
    deleteTechnician,
} from "../controllers/technicianController.js";


const router = express.Router();

router.get("/",  getTechnician);
router.post("/", addTechnician);
router.put("/:id", updateTechnician);
router.delete("/:id", deleteTechnician);

export default router;
