import mongoose from "mongoose";
import Joi from "joi";

const departmentSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    parent: {
        type: String,
        required: true,
    },
});

function departmentValidator(department) {
    const schema = Joi.object({
        _id: Joi.string().required(),
        name: Joi.string().required().min(3),
        parent: Joi.string().required(),
    });
    return schema.validate(department);
}
const Department = new mongoose.model(
    "Organization structure",
    departmentSchema
);
export { Department, departmentValidator };
