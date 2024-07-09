import { User, userValidator } from "../models/user.js";
import bcrypt from "bcrypt";
import _ from "lodash";
import Email from "../models/Email.js";

const getUser = async (req, res) => {
    const users = await User.find().populate("department", "name -_id").sort({ fullName: 1 });
    res.send(users);

};

const addUser = async (req, res) => {
    const { error } = userValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const existingEmail = await Email.findOne({ email: req.body.email });
    if (existingEmail)
        return res.status(400).send("User already registered !!!");
    const newEmail = new Email({ email: req.body.email });
    await newEmail.save();
    const user = new User(_.pick(req.body, ["fullName", "email", "password", "department", "phone"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken()
    res.send(token)
};

const updateUser = async (req, res) => {
    const { error } = userValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ["fullName", "email", "password", "department", "phone"]),
        {
            new: true,
        }
    );
    if (!user) return res.status(404).send("User not Found!");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    res.send(user);
};

const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not Found!");
    await Email.deleteOne({ email: user.email });
    res.send(user);
};
export {getUser, addUser, updateUser, deleteUser};