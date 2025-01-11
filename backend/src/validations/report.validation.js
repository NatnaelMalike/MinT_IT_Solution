import Joi from "joi";

const reportSchema = {
  body: Joi.object().keys({
    issueTitle: Joi.string().required(),
    issueDescription: Joi.string().required(),
  }),
};

export default reportSchema;
