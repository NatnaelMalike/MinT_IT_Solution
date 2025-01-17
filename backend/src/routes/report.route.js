import { Router } from "express";
import {
  deleteReport,
  editReport,
  getReportById,
  getReports,
  getReportsByUser,
  issueReport,
} from "../controllers/report.controller.js";
import validate from "../middlewares/validate.middleware.js";
import reportSchema from "../validations/report.validation.js";

const router = Router();

router.get("/", getReports);
router.get("/me", getReportsByUser);
router.get("/:id", getReportById);
router.post("/",validate(reportSchema), issueReport);
router.patch("/:id",validate(reportSchema), editReport);
router.delete("/:id", deleteReport);

export default router