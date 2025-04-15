import { Router } from "express";
import { addProfession, deleteProfession, getProfessionById, getProfessions, updateProfession } from "../controllers/profession.controller.js";
import validate from "../middlewares/validate.middleware.js";
import professionSchema from "../validations/profession.validation.js";

const router = Router();


router.post("/",validate(professionSchema), addProfession)
router.patch("/:id",updateProfession)
router.delete("/:id", deleteProfession)

export default router
