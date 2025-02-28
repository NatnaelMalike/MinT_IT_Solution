import Joi from "joi";
import mongoose from "mongoose";

const reportSchema = {
  body: Joi.object().keys({
    reportedBy: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('"id" must be a valid MongoDB ObjectId');
        }
        return value;
      })
      .required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.string()
      .valid("Low", "Medium", "High", "Critical")
      .default("Low"),
    attachments: Joi.array()
      .items(
        Joi.object({
          filePath: Joi.string().required(),
        })
      )
      .optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    isConfidential: Joi.boolean().default(false),
    status: Joi.string()
      .valid("Pending", "In Progress", "Resolved", "Unresolved", "Closed")
      .default("Pending"),
  }),
};

export default reportSchema;
