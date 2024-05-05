import express from "express";
import {
    getAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin,
} from "../controllers/adminController.js";
import authorize from "../middleware/authorization.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.get("/", admin, getAdmin);
router.post("/", admin, addAdmin);
router.put("/:id", admin, updateAdmin);
router.delete("/:id", admin, deleteAdmin);

export default router;
