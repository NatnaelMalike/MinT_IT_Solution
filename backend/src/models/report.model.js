import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "In Progress", "Resolved", "Unresolved", "Closed"],
    },

    priority: {
      type: String,
      default: "Low",
      enum: ["Low", "Medium", "High", "Critical"],
    },

    attachments: [
      {
        filePath: { type: String },
      },
    ],

    tags: {
      type: [String], // ["network", "hardware", "software"]
      default: [],
    },

    isConfidential: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
