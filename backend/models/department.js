import mongoose from "mongoose";
import Joi from "joi";

const departmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

function departmentValidator(department) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
    });
    return schema.validate(department);
}
const Department = new mongoose.model("Department", departmentSchema);
export { Department, departmentValidator };
