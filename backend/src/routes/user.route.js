import { Router } from "express";
import { changePassword, deleteUser, editProfile, getCurrentUser, getUserById, getUsers } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import { changePasswordSchema, editProfileSchema } from "../validations/user.validation.js";

const router = Router()

router.get('/', getUsers)
router.get('/me', getCurrentUser)
router.get('/id/:id', getUserById)
router.patch('/edit',validate(editProfileSchema), editProfile)
router.patch('/changePassword',validate(changePasswordSchema), changePassword)
router.delete('/delete/:id', deleteUser)

export default  router;
