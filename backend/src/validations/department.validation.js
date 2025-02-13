import Joi from "joi";

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
};

export default departmentSchema;
