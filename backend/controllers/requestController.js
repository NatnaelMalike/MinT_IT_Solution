import { Request, requestValidator } from "../models/request.js";
import _ from "lodash";

const getRequest = async (req, res) => {
    const requests = await Request.find().populate('user_id', "fullName department phone -_id");
    res.send(requests);
};

const addRequest = async (req, res) => {
    const { error } = requestValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const request = new Request(
        _.pick(req.body, ["user_id", "issueType", "description"])
    );
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
    if(!request) return res.status(404).send("Request Not Found!")
        res.send(request)
};
const deleteRequest = async(req, res)=>{
    const request = await Request.findByIdAndDelete(req.params.id);
    if(!request) return res.status(404).send("Request Not Found!");
        res.send(request)
}

export {getRequest, addRequest, updateRequest, deleteRequest}