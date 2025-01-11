import reportSchema from "../validations/report.validation.js";
import Report from "../models/report.model.js";
import { isValidObjectId } from "mongoose";

const getReports = async (req, res) => {
  const reports = await Report.find();
  res.status(200).json(reports);
};

const issueReport = async (req, res) => {
  try {
    const { error } = reportSchema.body.validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }

    const report = await Report.create({
      userId: req.user?._id,
      ...req.body,
    });

    res.status(201).json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getReportById = async (req, res) => {
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
};

const editReport = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid report id." });
    return;
  }

  const { error } = reportSchema.body.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const report = await Report.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  if (!report) {
    res.status(404).json({ message: "Report not found" });
    return;
  }

  res.status(200).json(report);
};

const deleteReport = async (req, res) => {
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
};

export { getReports, getReportById, issueReport, editReport, deleteReport };
