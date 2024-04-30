import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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

const User = new mongoose.model("Normal users", adminSchema);

export default User;
