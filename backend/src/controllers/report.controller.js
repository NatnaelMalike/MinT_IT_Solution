import reportSchema from "../validations/report.validation.js";
import Issue from "../models/report.model.js";
import { isValidObjectId } from "mongoose";
import asyncMiddleware from "../middlewares/async.middleware.js";

const getReports = asyncMiddleware(async (req, res) => {
  const reports = await Issue.find();
  res.status(200).json(reports);
});

const getReportsByUser = asyncMiddleware(async (req, res) => {
  const reports = await Issue.find({ reportedBy: req.user._id });
  res.status(200).json(reports);
});

const issueReport = asyncMiddleware(async (req, res) => {
  const report = await Issue.create({
    reportedBy: req.user?._id,
    ...req.body,
  });

  res.status(201).json({ message: "Issue reported successfully" }, report);
});

const getReportById = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid issue id." });
    return;
  }

  const report = await Issue.findById(id);
  if (!report) {
    res.status(404).json({ message: "Issue not found." });
    return;
  }
  res.status(200).json(report);
});

const editReport = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid issue id." });
    return;
  }
  const issue = await Issue.findById(id);
  if (!issue) {
    res.status(404).json({ message: "Issue not found." });
    return;
  }
  if (issue.status === "Pending") {
    const e_issue = await Issue.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Issue updated successfully" }, e_issue);
  } else {
    res.status(400).json({
      message: "You can't edit an issue unless it is in a Pending state",
    });
  }
});

const deleteReport = asyncMiddleware(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid issue id." });
    return;
  }
  const issue = await Issue.findById(id);
  if (!issue) {
    res.status(404).json({ message: "Issue not found" });
    return;
  }
  if (issue.status !== "Pending") {
    res.status(400).json({
      message: "You can't delete an issue unless it is in a Pending state",
    });
    return;
  } else {
    const d_issue = await Issue.findByIdAndDelete(id);
    res.status(200).json({ message: "Issue deleted successfully!" }, d_issue);
  }
});

export {
  getReports,
  getReportsByUser,
  getReportById,
  issueReport,
  editReport,
  deleteReport,
};
