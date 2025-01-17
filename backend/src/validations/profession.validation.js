import Joi from "joi";
import mongoose from "mongoose";

const professionSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),

};
export default professionSchema;
