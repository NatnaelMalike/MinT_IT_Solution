import { Assignment, assignmentValidator } from "../models/assignment.js";
import _ from "lodash";
import { Request } from "../models/request.js";

const assignTechnician = async (req, res) => {
    try {
        const { error } = assignmentValidator(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let assignment = await Assignment.findOne({
            request_id: req.body.request_id,
        });
        if (assignment && assignment.technician_id === req.body.technician_id) {
            return res.status(400).send("Assignment already exists");
        }
        assignment = new Assignment(
            _.pick(req.body, ["request_id", "technician_id"])
        );
        await assignment.save();
        let request = await Request.findById(req.body.request_id);
        if (!request) {
            return res.status(404).send("Request not found");
        }
        request.isAssigned = true;
        request.status = "Pending";
        await request.save();
        res.send(assignment);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const getAssignedRequests = async (req, res) => {
    try {
        const { role, _id } = req.user;
        if (role === "technician_user") {
            const technician_id = _id;
            const requests = await Assignment.find({ technician_id }).populate({
                path: "request_id",
                select: "issueType description user_id status createdAt _id",
                populate: {
                    path: "user_id",
                    select: "fullName department phone -_id",
                    populate: {
                        path: "department",
                        select: "name -_id",
                    },
                },
            });
            res.send(requests);
        } else if (role === "helper_admin" || role === "super_admin") {
            const requests = await Assignment.find()
                .populate({
                    path: "request_id",
                    select: "issueType description user_id -_id",
                    populate: {
                        path: "user_id",
                        select: "fullName department phone -_id",
                        populate: {
                            path: "department",
                            select: "name -_id",
                        },
                    },
                })
                .populate({
                    path: "technician_id",
                    select: "fullName profession phone",
                });
            res.send(requests);
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export { assignTechnician, getAssignedRequests };
