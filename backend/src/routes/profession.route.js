import { Router } from "express";
import { addProfession, deleteProfession, getProfessionById, getProfessions, updateProfession } from "../controllers/profession.controller.js";

const router = Router();

router.get("/", getProfessions);
router.get("/:id", getProfessionById);
router.post("/", addProfession)
router.patch("/:id",updateProfession)
router.delete("/:id", deleteProfession)

export default router
