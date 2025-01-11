import { Router } from "express";
import {
  deleteReport,
  editReport,
  getReportById,
  getReports,
  issueReport,
} from "../controllers/report.controller.js";

const router = Router();

router.get("/", getReports);
router.get("/:id", getReportById);
router.post("/", issueReport);
router.patch("/:id", editReport);
router.delete("/:id", deleteReport);

export default router