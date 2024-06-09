import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";
import { User } from "../models/user.js";
import { Technician } from "../models/technician.js";
import _ from "lodash";

export default async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).send("Access Denied!, No token Provided");
    const token = authorization.split(" ")[1];
    try {
        const { _id } = jwt.verify(token, process.env.ACCESS_JWT_PRIVATE_KEY);

        const admin = await Admin.findOne({ _id });
        const normal = await User.findOne({ _id });
        const technician = await Technician.findOne({ _id });
        if (admin) {
            req.user = _.pick(admin, ["_id"]);
        } else if (normal) {
            req.user = _.pick(normal, ["_id"]);
        } else if (technician) {
            req.user = _.pick(technician, ["_id"]);
        } else {
            return res.status(400).send("User Not Found!");
        }
        next();
    } catch (error) {
        res.status(400).send("Invalid Token");
    }
};
