import express from "express";
import { getUser, addUser, updateUser, deleteUser } from "../controllers/userController.js";
import normalUser from "../middleware/normalUser.js";
import admin from "../middleware/admin.js";
const router = express.Router();

router.get("/", getUser);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
