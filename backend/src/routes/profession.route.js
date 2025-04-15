import { Router } from "express";
import { getProfessionById, getProfessions } from "../controllers/profession.controller.js";


const router = Router();

router.get("/", getProfessions);
router.get("/:id", getProfessionById);

export default router
