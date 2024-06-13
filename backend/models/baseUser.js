import mongoose from "mongoose";
const options = { discriminatorKey: 'role', timestamps: true };
const baseUserSchema = mongoose.Schema(
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
        role: {
            type: String,
            enum : ["super_admin", "helper_admin", "normal_user", "technician_user"],
            required: true
        },
    },
    { timestamps: true },
    options
)

const BaseUser = mongoose.model('User', baseUserSchema)

export default BaseUser