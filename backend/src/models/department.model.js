import mongoose from "mongoose";
import Joi from "joi";

const departmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        sector: {
            type: String,
            required: true,
            enum: [
              "Research and Innovation Sector",
              "Adminstration Sector",
              "ICT and Digital Economy Sector",
            ],
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
export default Department;
