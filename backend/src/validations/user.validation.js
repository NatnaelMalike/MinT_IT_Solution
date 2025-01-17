import Joi from "joi";
import mongoose from "mongoose";
const validRoles = [
    "SuperAdmin",
    "HelperAdmin",
    "TechnicianUser",
    "NormalUser",
  ];
  const userSchema = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
      department: Joi.string()
        .custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('"id" must be a valid MongoDB ObjectId');
          }
          return value;
        })
        .required(),
      profession: Joi.alternatives().conditional("role", {
        is: "TechnicianUser",
        then: Joi.string()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.message('"id" must be a valid MongoDB ObjectId');
            }
            return value;
          })
          .required(),
        otherwise: Joi.string().valid("None").default("None"),
      }),
      isActive: Joi.boolean().default(true),
  
      role: Joi.string()
        .valid(...validRoles)
        .default("NormalUser"),
    }),
  };
  const editProfileSchema = {
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      profilePicture: Joi.string().allow("").optional(),
    }),
  };
  
  const changePasswordSchema = {
    body: Joi.object({
      oldPassword: Joi.string().min(6).required().label("Old Password"),
      newPassword: Joi.string().min(6).required().label("New Password"),
      confirmPassword: Joi.string()
        .valid(Joi.ref("newPassword"))
        .required()
        .label("Confirm Password"),
    })
      .unknown(true)
      .custom((value, helpers) => {
        if (value.oldPassword === value.newPassword) {
          return helpers.message("New password must not be the same as the old password.",
          );
        }
        return value;
      }),
  };
  export { userSchema, editProfileSchema, changePasswordSchema };
