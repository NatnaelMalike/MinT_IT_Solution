import { Assignment, assignmentValidator } from "../models/assignment.js"
import _ from "lodash"

const assignTechnician = async (req, res)=>{
    const {error} = assignmentValidator(req.body)
    if(error) return res.status(400).send(error.details[0].message);
    let assignment = Assignment.findOne({request_id: req.body.request_id})
    if(assignment) return res.status(400).send("Assignment already exists");
    assignment = new Assignment(
        _.pick(req.body,["request_id", "technician_id"])
    );
    await assignment.save()
    res.send(assignment)

}
export {assignTechnician}