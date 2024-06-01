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
                'Computer malfunction',
                'Printer issues',
                'Peripheral device problems',
                'Network equipment',
                'Application crashes or errors',
                'Software installation or update issues',
                'Licensing problems',
                'System performance issues',
                'Internet connectivity issues',
                'Intranet or VPN problems',
                'Network speed issues',
                'Access to network resources',
                'Email delivery issues',
                'Email configuration problems',
                'Spam or phishing emails',
                'Virus or malware infection',
                'Unauthorized access or hacking attempts',
                'Password issues',
                'Security policy questions',
                'User account creation or deletion',
                'Password reset',
                'Permissions and access issues',
                'Account lockout',
                'General IT support',
                'Miscellaneous issues'
            ],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: { type: String, default: 'Pending' },
        isAssigned: { type: Boolean, default: false },
    },
    {timestamps:true}
);
function requestValidator(request) {
    const schema = Joi.object({
        user_id: Joi.required(),
        issueType: Joi.required(),
        description: Joi.string().required(),
    });
    return schema.validate(request);
}
const Request = mongoose.model("Request", requestSchema);
export { Request, requestValidator };
