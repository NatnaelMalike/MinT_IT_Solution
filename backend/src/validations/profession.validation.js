import Joi from "joi";

const professionSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};
export default professionSchema;
