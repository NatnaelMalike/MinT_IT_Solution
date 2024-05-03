import mongoose from "mongoose";
import Joi from "joi";
import { lowerCase } from "lodash";
const technicianSchema = mongoose.Schema({
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
    department: {
        type: String,
        required: true,
    },
    role: 'technician'
});

technicianSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.ACCESS_JWT_PRIVATE_KEY);
    return token
}

function techValidator(technician) {
    const schema = Joi.object({
        fullName: Joi.string().required().min(5).max(50),
        email: Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(6).max(255),
        phone: Joi.string().required(),
        department: Joi.string().required()
    });
    return schema.validate(technician);
}
const Technician = new mongoose.model("Technician users", technicianSchema);

export {Technician, techValidator};
