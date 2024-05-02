import express from "express";
import {
    getAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin,
} from "../controllers/adminController.js";
const router = express.Router();

router.get("/", getAdmin);
router.post("/", addAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;
