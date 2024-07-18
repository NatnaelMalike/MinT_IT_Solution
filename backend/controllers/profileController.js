import _ from "lodash";
import { User } from "../models/user.js";
import { Admin } from "../models/admin.js";
import { Technician } from "../models/technician.js";

const getProfile = async (req, res) => {
    try {
        const { role, _id } = req.user;
        if (role === "normal_user") {
            const user_id = _id;
            let user = await User.findById(user_id).populate(
                "department",
                "name -_id"
            );
            user = _.pick(user, ["fullName", "email", "department", "phone","role"]);
            res.send(user);
        } else if (role === "super_admin") {
            const user_id = _id;
            let user = await Admin.findById(user_id).populate(
                "department",
                "name -_id"
            );
            res.send(user);
        } else if (role === "technician_user") {
            const user_id = _id;
            let user = await Technician.findById(user_id).populate(
                "department",
                "name -_id"
            );
            res.send(user);
        } else if (role === "helper_admin") {
            const user_id = _id;
            let user = await Admin.findById(user_id).populate(
                "department",
                "name -_id"
            );
            res.send(user);
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export default getProfile;
