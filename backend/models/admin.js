import mongoose from "mongoose";
const adminSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
})

const Admin = new mongoose.model('Admin users', adminSchema)

export default Admin