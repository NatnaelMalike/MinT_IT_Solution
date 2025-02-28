import Joi from "joi";
const assignmentSchema = {
  body: Joi.object().keys({
    assignedTo: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('"id" must be a valid MongoDB ObjectId');
        }
        return value;
      })
      .required(),
    assignedBy: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('"id" must be a valid MongoDB ObjectId');
        }
        return value;
      })
      .required(),
    type: {
      type: String,
      enum: ["initial", "reassignment", "escalation"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  }),
};
export default assignmentSchema;
