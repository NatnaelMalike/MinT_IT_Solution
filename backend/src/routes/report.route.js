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
import { uploadIssueFiles } from "../services/fileUpload.service.js";
import { uploadIssueAttachements } from "../controllers/fileUpload.controller.js";

const router = Router();

router.get("/", getReports);
router.get("/me", getReportsByUser);
router.get("/:id", getReportById);
router.post("/", validate(reportSchema), issueReport);
router.post("/issue-attachments",uploadIssueFiles, uploadIssueAttachements)
router.patch("/:id", validate(reportSchema), editReport);
router.delete("/:id", deleteReport);

export default router;
