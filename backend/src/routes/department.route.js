import { Router } from "express";
import { getDepartmentById, getDepartments, addDepartment, updateDepartment, deleteDepartment } from "../controllers/department.controller.js";

const router = Router()

router.get('/', getDepartments)
router.get('/:id', getDepartmentById)
router.post('/', addDepartment)
router.patch('/:id', updateDepartment)
router.delete('/:id', deleteDepartment)

export default router
