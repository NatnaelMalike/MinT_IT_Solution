import Joi from 'joi'
import mongoose from "mongoose"

const assignSchema = mongoose.Schema({
    request_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true
    },
    technician_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technician users',
        required: true
    },
    assignedAt: { type: Date, default: Date.now }
})

function assignmentValidator(assigned){
    const schema = Joi.object({
        request_id: Joi.objectId().required(),
        technician_id: Joi.objectId().required(),
    })
    return schema.validate(assigned)
}

const Assignment = new mongoose.model("Assignment", assignSchema)

export {Assignment, assignmentValidator}