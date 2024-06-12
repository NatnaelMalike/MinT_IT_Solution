import Joi from "joi";
import mongoose from "mongoose";
const requestSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Normal users",
            required: true,
        },
        issueType: {
            type: String,
            enum: [
                "Computer malfunction",
                "Printer issues",
                "Peripheral device problems",
                "Network equipment",
                "Application crashes or errors",
                "Software installation or update issues",
                "System performance issues",
                "Internet connectivity issues",
                "Email issues",
                "Virus or malware infection",
                "Unauthorized access or hacking attempts",
                "Password issues",
                "General IT support",
                "Miscellaneous issues",
            ],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: { type: String, default: "Pending" },
        isAssigned: { type: Boolean, default: false },
    },
    { timestamps: true }
);
function requestValidator(request) {
    const schema = Joi.object({
        issueType: Joi.required(),
        description: Joi.string().required(),
    });
    return schema.validate(request);
}
const Request = mongoose.model("Request", requestSchema);
export { Request, requestValidator };
