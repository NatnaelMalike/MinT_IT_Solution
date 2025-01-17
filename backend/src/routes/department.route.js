import { Router } from "express";
import { getDepartmentById, getDepartments, addDepartment, updateDepartment, deleteDepartment } from "../controllers/department.controller.js";
import validate from "../middlewares/validate.middleware.js";
import departmentSchema from "../validations/department.validation.js";
const router = Router()

router.get('/', getDepartments)
router.get('/:id',validate(departmentSchema), getDepartmentById)
router.post('/',validate(departmentSchema), addDepartment)
router.patch('/:id',validate(departmentSchema), updateDepartment)
router.delete('/:id',validate(departmentSchema), deleteDepartment)

export default router
