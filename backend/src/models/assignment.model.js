import mongoose from "mongoose";

const assignmentSchema = mongoose.Schema({
  issueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Issue",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["initial", "reassignment", "escalation"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
