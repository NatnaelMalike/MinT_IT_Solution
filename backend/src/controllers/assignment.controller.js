import asyncMiddleware from "../middlewares/async.middleware.js";
import Assignment from "../models/assignment.model.js";
import Issue from "../models/report.model.js";

const assignIssue = asyncMiddleware(async (req, res) => {
  const issueId = req.params.id;
  const issue = await Issue.findById(issueId);
  const { assignedTo, assignedBy, message } = req.body;
  // if issue is not found
  if (!issue) {
    res.status(404).json({ message: "Issue not found" });
    return;
  }
  const prevAssignment = await Assignment.findOne({
    issueId,
    assignedTo,
  });

  if (prevAssignment) {
    return res.status(400).json({ message: "Assignment already exists" });
  }

  const assignee = await User.findById(assignedTo);
  if (!assignee || assignee.role !== "TechnicianUser") {
    return res
      .status(400)
      .json({ message: "Assigned user must be a technician" });
  }

  const assignment = await Assignment.create({
    issueId,
    assignedBy,
    assignedTo,
    type: "initial",
    message: message || "Assigned to technician",
  });

  await Issue.findByIdAndUpdate(issueId, { status: "In Progress" });

  res.status(201).json({ message: "Issue assigned successfully", assignment });
});

const reassignIssue = asyncMiddleware(async (req, res) => {
  const issueId = req.params.id;
  const issue = await Issue.findById(issueId);
  const { assignedTo, assignedBy, message } = req.body;

  if (!issue) {
    res.status(404).json({ message: "Issue not found" });
    return;
  }
  const prevAssignment = await Assignment.findOne({
    issueId,
    assignedTo,
  });

  if (prevAssignment) {
    return res
      .status(400)
      .json({ message: "This technician has already handled this issue" });
  }

  const assignee = await User.findById(assignedTo);
  if (!assignee || assignee.role !== "TechnicianUser") {
    return res
      .status(400)
      .json({ message: "Assigned user must be a technician." });
  }
  if (issue.status === "Closed") {
    res.status(400).json({ message: "Issue is already closed." });
    return;
  } else if (issue.status === "Resolved") {
    res.status(400).json({ message: "Issue is already resolved." });
    return;
  } else if (issue.status === "In Progress") {
    res.status(400).json({ message: "Issue is not resolved yet." });
    return;
  }
  const assignment = await Assignment.create({
    issueId,
    assignedBy,
    assignedTo,
    type: "reassignment",
    message: message || "Reassigned to another technician",
  });

  res
    .status(200)
    .json({ message: "Issue reassigned successfully", assignment });
});

const escalateIssue = asyncMiddleware(async (req, res) => {
  const issueId = req.params.id;
  const issue = await Issue.findById(issueId);
  const { assignedTo, assignedBy, message } = req.body;

  if (!issue) {
    res.status(404).json({ message: "Issue not found" });
    return;
  }

  const prevAssignment = await Assignment.findOne({
    issueId,
    assignedTo,
  });

  if (prevAssignment) {
    return res.status(400).json({ message: "Assignment already exists" });
  }

  const assignee = await User.findById(assignedTo);
  if (!assignee || assignee.role !== "SuperAdmin") {
    return res
      .status(400)
      .json({ message: "Escalation must be to a SuperAdmin" });
  }

  if (issue.status === "Closed") {
    res.status(400).json({ message: "Issue is already closed" });
    return;
  } else {
    const assignment = await Assignment.create({
      issueId,
      assignedBy,
      assignedTo,
      type: "escalation",
      message: message || "Issue escalated to SuperAdmin",
    });
    await Issue.findByIdAndUpdate(issueId, { status: "Closed" });
    res
      .status(200)
      .json({ message: "Issue escalated successfully", assignment });
  }
});
