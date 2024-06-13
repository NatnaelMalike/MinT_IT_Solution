import mongoose from "mongoose";
import BaseUser from "./baseUser";

// Normal User Schema (inherits from BaseUser)

// Technician Schema (inherits from BaseUser)
const technicianSchema = new mongoose.Schema({
    profession: {
        type: String,
        required: true,
        enum: [
            "Electrician",
            "Data Center Technician",
            "Cloud Support Specialist",
            "Network Engineer",
            "Field Service Technician",
            "Web Administrator",
            "Systems Analyst",
            "Database Administrator",
            "IT Support Technician",
        ],
    },
});

// Admin Schema (inherits from BaseUser)
const adminSchema = new mongoose.Schema({});
const helperSchema = new mongoose.Schema({});
const userSchema = new mongoose.Schema({});

const Technician = BaseUser.discriminator("technician_user", technicianSchema);
const Helper = BaseUser.discriminator("helper_admin", helperSchema);
const User = BaseUser.discriminator("normal_user", userSchema);
const Admin = BaseUser.discriminator("super_admin", adminSchema);

module.exports = { User, Technician, Admin, Helper };
