import { Admin, adminValidator } from "../models/admin.js";
import bcrypt from "bcrypt";
import _ from "lodash";

const getAdmin = async (req, res) => {
    const users = await Admin.find();
    res.send(users);
};

const addAdmin = async (req, res) => {
    const { error } = adminValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Admin.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User Already Registered !!!");
    user = new Admin(
        _.pick(req.body, ["fullName", "email", "password", "phone"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken()
    res.header('x-auth-token',token).send(_.pick(user, ["fullName", "email", "password", "phone"]));
};

const updateAdmin = async (req, res) => {
    const { error } = adminValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Admin.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ["fullName", "email", "password", "phone"]),
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
    res.send(user);
};

export { getAdmin, addAdmin, updateAdmin, deleteAdmin };
