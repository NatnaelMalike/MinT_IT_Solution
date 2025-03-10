import Joi from "joi";

const reportSchema = {
  body: Joi.object().keys({
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
