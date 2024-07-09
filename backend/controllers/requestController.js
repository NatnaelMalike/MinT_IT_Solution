import { Request, requestValidator, requestStatusValidator } from "../models/request.js";
import _ from "lodash";

const getRequest = async (req, res) => {
    try {
        const {role, _id} = req.user
        if(role === 'normal_user'){
            const user_id = _id
            const requests = await Request.find({user_id}).populate(
                "user_id",
                "fullName department phone -_id"
            );
            res.send(requests); 
        }else if (role === "helper_admin" || role === "super_admin"){
            const requests = await Request.find().populate({
                path: 'user_id',
                select: 'fullName department phone -_id',
                populate: {
                    path: 'department',
                    select: 'name' 
                }
            });
            res.send(requests); 
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
        
    }  
};
const getById = async (req, res) => {
    const request = await Request.findOne(req.params.id);
    if (!request) return res.status(404).send("Request not Found!!!");
};
const addRequest = async (req, res) => {
    const { error } = requestValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { issueType, description } = req.body;
    const user_id = req.user._id;
    const request = new Request({
        issueType,
        description,
        user_id
    });
    await request.save();
    res.send(request);
};
const updateRequest = async (req, res) => {
    const { error } = requestValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const request = await Request.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ["issueType", "description"]),
        { new: true }
    );
    if (!request) return res.status(404).send("Request Not Found!");
    res.send(request);
};
const updateRequestStatus = async (req, res) => {
    const { error } = requestStatusValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const request = await Request.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ["status"]),
        { new: true }
    );
    if (!request) return res.status(404).send("Request Not Found!");
    res.send(request);
};
const deleteRequest = async (req, res) => {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).send("Request Not Found!");
    res.send(request);
};

export { getRequest, addRequest, updateRequest, deleteRequest, getById, updateRequestStatus };
