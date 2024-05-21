import mongoose from "mongoose";
import Joi from "joi";
import jwt from 'jsonwebtoken'
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
    phone: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default : 'admin'
    }
});

adminSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.ACCESS_JWT_PRIVATE_KEY);
    return token
}

function adminValidator(admin) {
    const schema = Joi.object({
        fullName: Joi.string().required().min(5).max(50),
        email: Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(6).max(255),
        phone: Joi.string().required(),
    });
    return schema.validate(admin);
}
function updateAdminValidator(admin) {
    const schema = Joi.object({
        fullName: Joi.string().required().min(5).max(50),
        email: Joi.string().email().required().min(5).max(255),
        phone: Joi.string().required(),
    });
    return schema.validate(admin);
}
const Admin = new mongoose.model("Admin users", adminSchema);

export { Admin, adminValidator, updateAdminValidator };
