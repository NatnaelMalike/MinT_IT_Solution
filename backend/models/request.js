import Joi from "joi";
import mongoose from "mongoose";
const requestSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    issueType: { type: String, required: true },
    description: { type: String, required: true },

});
function requestValidator(request){
    const schema = Joi.object({
        user_id: Joi.required(),
        issueType: Joi.required(),
        description: Joi.string().required(),
    })
    return schema.validate(request)
}
const Request = mongoose.model('Request', requestSchema)
export {Request, requestValidator}
