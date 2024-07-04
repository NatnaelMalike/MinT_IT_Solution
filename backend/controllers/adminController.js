import {
    Admin,
    adminValidator,
    updateAdminValidator,
} from "../models/admin.js";
import bcrypt from "bcrypt";
import _ from "lodash";
import Email from "../models/Email.js";

const getAdmin = async (req, res) => {
    const users = await Admin.find({}, { password: 0 }).populate("department", "name -_id").sort({ fullName: 1 });
    res.send(users);
};

const addAdmin = async (req, res) => {
    const { error } = adminValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const existingEmail = await Email.findOne({ email: req.body.email });
    if (existingEmail)
        return res.status(400).send("User already registered !!!");
    const newEmail = new Email({ email: req.body.email });
    await newEmail.save();
    const user = new Admin(
        _.pick(req.body, [
            "fullName",
            "email",
            "password",
            "department",
            "phone",
        ])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    // const token = user.generateAuthToken();
    // res.send(token);
};

const updateAdmin = async (req, res) => {
    const { error } = updateAdminValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Admin.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ["fullName", "email", "phone"]),
        {
            new: true,
        }
    );
    if (!user) return res.status(404).send("User not Found!");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    res.send(user);
};

const deleteAdmin = async (req, res) => {
    const user = await Admin.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not Found!");
    await Email.deleteOne({ email: user.email });
    res.send(user);
};

const getById = async (req, res) => {
    const user = await Admin.findById(req.params.id);
    if (!user) return res.status(404).send("User not Found!");
    res.send(user);
};

export { getAdmin, addAdmin, updateAdmin, deleteAdmin, getById };
