import express from "express";
import { getUser, addUser, updateUser, deleteUser } from "../controllers/userController.js";
import normalUser from "../middleware/normalUser.js";
import admin from "../middleware/admin.js";
const router = express.Router();

router.get("/", admin, getUser);
router.post("/", normalUser, addUser);
router.put("/:id", normalUser, updateUser);
router.delete("/:id", admin, deleteUser);

export default router;
