import Joi from "joi";
import { lowerCase } from "lodash";
import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 1024
    },
    department: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
});

function userValidator(user) {
    const schema = Joi.object({
        fullName: Joi.string().required().min(5).max(50),
        email: Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(6).max(255),
        phone: Joi.string().required(),
        department: Joi.string().required()
    });
    return schema.validate(user);
}
const User = new mongoose.model("Normal users", adminSchema);

export {User, userValidator};
