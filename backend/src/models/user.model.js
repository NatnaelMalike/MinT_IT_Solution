import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
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
      match: [/^\+251\d{9}$/, "Phone number must start with +251 followed by 9 digits"],
    },
    profession: {
      type: mongoose.Schema.Types.Mixed,
      ref: "Profession",
      required: function () {
        return this.role === "TechnicianUser";
      },
      default: "None",
    },
    status: { type: String, enum: ['pending', 'active', 'inactive'], default: 'pending' },
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
