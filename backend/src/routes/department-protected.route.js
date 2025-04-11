import { Router } from "express";
import {
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";
import validate from "../middlewares/validate.middleware.js";
import departmentSchema from "../validations/department.validation.js";

const router = Router();

router.post("/", validate(departmentSchema), addDepartment);
router.patch("/:id", validate(departmentSchema), updateDepartment);
router.delete("/:id", deleteDepartment);

export default router;