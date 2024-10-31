import Joi from "joi";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowerCase: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 1024,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "normal_user",
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, role: this.role },
        process.env.ACCESS_JWT_PRIVATE_KEY
    );
    return token;
};
function userValidator(user) {
    const schema = Joi.object({
        fullName: Joi.string().required().min(5).max(50),
        email: Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(6).max(255),
        confirmPassword: Joi.string().required().min(6).max(255),
        phone: Joi.string().required(),
        department: Joi.string().required(),
    });
    return schema.validate(user);
}
function updateUserValidator(user) {
    const schema = Joi.object({
        fullName: Joi.string().required().min(5).max(50),
        email: Joi.string().email().required().min(5).max(255),
        phone: Joi.string().required(),
        department: Joi.string().required(),
    });
    return schema.validate(user);
}

const User = new mongoose.model("Normal users", userSchema);

export { User, userValidator, updateUserValidator };
