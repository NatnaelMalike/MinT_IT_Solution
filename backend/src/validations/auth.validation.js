import Joi from "joi";

const loginSchema = {
    body:  Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        remember:  Joi.boolean()
    })

}
const refreshTokenSchema = {
    body: Joi.object().keys({
      refreshToken: Joi.string().required(),
    }),
  };
const inviteTokenSchema = {
    body: Joi.object().keys({
      role: Joi.string()
              .valid("HelperAdmin", "TechnicianUser")
              .required(),
    }),
  };
export {loginSchema, refreshTokenSchema, inviteTokenSchema};
