import { Router } from "express";
import { changePassword, deleteUser, editProfile, getCurrentUser, getUserById, getUsers } from "../controllers/user.controller.js";

const router = Router()

router.get('/', getUsers)
router.get('/me', getCurrentUser)
router.get('/id/:id', getUserById)
router.patch('/edit', editProfile)
router.patch('/changePassword', changePassword)
router.delete('/delete/:id', deleteUser)

export default  router;
