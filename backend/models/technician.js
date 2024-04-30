import mongoose from "mongoose";
import Joi from "joi";
const adminSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
});

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
const Technician = new mongoose.model("Technician users", adminSchema);

export {Technician, techValidator};
