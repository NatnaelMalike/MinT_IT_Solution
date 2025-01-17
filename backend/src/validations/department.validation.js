import Joi from "joi";
import mongoose from "mongoose";

const Sector = [
  "Research and Innovation Sector",
  "Adminstration Sector",
  "ICT and Digital Economy Sector",
]

const departmentSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    sector: Joi.string()
      .valid(...Sector)
      .required(),
  }),
  params: Joi.object({
    id: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message('"id" must be a valid MongoDB ObjectId');
        }
        return value;
      }, 'Object Id Validation')
      .required()
  })
};

export default departmentSchema;
