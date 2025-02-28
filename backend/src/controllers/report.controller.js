import reportSchema from "../validations/report.validation.js";
import Report from "../models/report.model.js";
import { isValidObjectId } from "mongoose";
import asyncMiddleware from "../middlewares/async.middleware.js";

const getReports = asyncMiddleware(async (req, res) => {
  const reports = await Report.find();
  res.status(200).json(reports);
});

const getReportsByUser = asyncMiddleware(async (req, res) => {
  const reports = await Report.find({ reportedBy: req.user._id });
  res.status(200).json(reports);
});

const issueReport = asyncMiddleware(async (req, res) => {
  const files = req.files.map((file) => file.filename);
  const report = await Report.create({
    reportedBy: req.user?._id,
    ...req.body,
    attachments: files.map((filePath) => ({ filePath })),
  });

  res.status(201).json(report);
});

const getReportById = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid department id." });
    return;
  }

  const report = await Report.findById(id);
  if (!report) {
    res.status(404).json({ message: "Report not found." });
    return;
  }

  res.status(200).json(report);
});

const editReport = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid report id." });
    return;
  }

  const { error } = reportSchema.body.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const report = await Report.findByIdAndUpdate(id, req.body, { new: true });
  if (!report) {
    res.status(404).json({ message: "Report not found" });
    return;
  }

  res.status(200).json(report);
});

const deleteReport = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid report id." });
    return;
  }

  const report = await Report.findByIdAndDelete(id);
  if (!report) {
    res.status(404).json({ message: "Report not found" });
    return;
  }
  res.status(200).json({ message: "Report deleted successfully!" });
});

export {
  getReports,
  getReportsByUser,
  getReportById,
  issueReport,
  editReport,
  deleteReport,
};
