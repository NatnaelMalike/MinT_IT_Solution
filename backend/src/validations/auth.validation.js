import Joi from "joi";

const loginSchema = {
    body:  Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        remember:  Joi.boolean()
    })

}
export default  loginSchema;
