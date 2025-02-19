import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
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
      minlength: 6,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
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
    profession: {
      type: mongoose.Schema.Types.Mixed,
      required: function () {
        return this.role === "TechnicianUser";
      },
      default: "None",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["SuperAdmin", "HelperAdmin", "TechnicianUser", "NormalUser"],
      default: "NormalUser",
    },
  },
  { timestamps: true }
);




const User = new mongoose.model("User", userSchema);
export default User;
