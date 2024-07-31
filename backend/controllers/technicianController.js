import {
    Technician,
    UpdateTechValidator,
    techValidator,
} from "../models/technician.js";
import bcrypt from "bcrypt";
import _ from "lodash";
import Email from "../models/Email.js";

const getTechnician = async (req, res) => {
    const users = await Technician.find().populate("department", "name _id");
    res.send(users);
};
const addTechnician = async (req, res) => {
    const { error } = techValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const existingEmail = await Email.findOne({ email: req.body.email });
    if (existingEmail)
        return res.status(400).send("User already registered !!!");
    const newEmail = new Email({ email: req.body.email });
    await newEmail.save();
    const user = new Technician(
        _.pick(req.body, [
            "fullName",
            "email",
            "password",
            "department",
            "profession",
            "phone",
        ])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    // const token = user.generateAuthToken();
    const populatedUser = await Technician.findById(user._id).populate(
        "department",
        "name"
    );
    res.send(populatedUser);
};

const updateTechnician = async (req, res) => {
    try {
        // Validate the request body
        const { error } = UpdateTechValidator(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Find the existing technician user
        const oldUser = await Technician.findById(req.params.id);
        if (!oldUser) return res.status(404).send("Technician not found!");

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

        // Update the technician user document
        let updatedTechnician = await Technician.findByIdAndUpdate(
            req.params.id,
            _.pick(req.body, [
                "fullName",
                "email",
                "department",
                "profession",
                "phone",
            ]),
            { new: true }
        ).populate("department", "name");

        if (!updatedTechnician) return res.status(404).send("Technician not found!");

        res.send(updatedTechnician);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};


const deleteTechnician = async (req, res) => {
    const user = await Technician.findByIdAndUpdate(req.params.id, {isActive: false});
    if (!user) return res.status(404).send("User not Found!");
    await Email.deleteOne({ email: user.email });
    res.send(user);
};
const getById = async (req, res) => {
    const user = await Technician.findById(req.params.id);
    if (!user) return res.status(404).send("User not Found!");
    res.send(user);
};

export {
    getTechnician,
    addTechnician,
    updateTechnician,
    deleteTechnician,
    getById,
};
