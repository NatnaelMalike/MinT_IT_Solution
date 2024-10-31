import { updateUserValidator, User, userValidator } from "../models/user.js";
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
    try {
        // Validate the request body
        const { error } = updateUserValidator(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Find the existing user
        const oldUser = await User.findById(req.params.id);
        if (!oldUser) return res.status(404).send("User not found!");

        // Check if the new email already exists in the emails collection
        const existingEmailByNewEmail = await Email.findOne({ email: req.body.email });

        if (existingEmailByNewEmail && existingEmailByNewEmail.email !== oldUser.email) {
            return res.status(400).send("Email already registered!");
        }

        // Update the email in the emails collection
        if (existingEmailByNewEmail) {
            existingEmailByNewEmail.email = req.body.email;
            await existingEmailByNewEmail.save();
        } else {
            const existingEmailByOldEmail = await Email.findOne({ email: oldUser.email });
            if (existingEmailByOldEmail) {
                existingEmailByOldEmail.email = req.body.email;
                await existingEmailByOldEmail.save();
            }
        }

        // Update the user document
        let updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            _.pick(req.body, [
                "fullName",
                "email",
                "department",
                "phone",
            ]),
            { new: true }
        ).populate("department", "name");

        if (!updatedUser) return res.status(404).send("User not found!");

        res.send(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

const deleteUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {isActive: false});
    if (!user) return res.status(404).send("User not Found!");
    await Email.deleteOne({ email: user.email });
    res.send(user);
};
export {getUser, addUser, updateUser, deleteUser};