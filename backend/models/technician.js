import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
const technicianSchema = mongoose.Schema(
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
        phone: {
            type: String,
            required: true,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        profession: {
            type: String,
            required: true,
            enum: [
                "Electrician",
                "Data Center Technician",
                "Cloud Support Specialist",
                "Network Engineer",
                "Network Adminstrator III",
                "Network Adminstrator IV",
                "Field Service Technician",
                "Website Administrator",
                "Systems Adminstrator IV",
                "Systems Adminstrator III",
                "Database Administrator",
                "Computer Maintenance III",
                "Computer Maintenance IV",
            ],
        },
        role: {
            type: String,
            default: "technician_user",
        },
    },
    { timestamps: true }
);

technicianSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, role: this.role },
        process.env.ACCESS_JWT_PRIVATE_KEY
    );
    return token;
};

function techValidator(technician) {
    const schema = Joi.object({
        fullName: Joi.string().required().min(5).max(50),
        email: Joi.string().email().required().min(5).max(255),
        password: Joi.string().required().min(6).max(255),
        confirmPassword: Joi.string().required().min(6).max(255),

        phone: Joi.string().required(),
        department: Joi.string().required(),
        profession: Joi.string().required(),
    });
    return schema.validate(technician);
}
function UpdateTechValidator(technician) {
    const schema = Joi.object({
        fullName: Joi.string().required().min(5).max(50),
        email: Joi.string().email().required().min(5).max(255),
        phone: Joi.string().required(),
        department: Joi.string().required(),
        profession: Joi.string().required(),
    });
    return schema.validate(technician);
}
const Technician = new mongoose.model("Technician users", technicianSchema);

export { Technician, techValidator, UpdateTechValidator };
