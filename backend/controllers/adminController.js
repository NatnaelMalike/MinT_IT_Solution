import {
    Admin,
    adminValidator,
    updateAdminValidator,
} from "../models/admin.js";
import bcrypt from "bcrypt";
import _ from "lodash";
import Email from "../models/Email.js";

const getAdmin = async (req, res) => {
    const users = await Admin.find({}, { password: 0 }).populate("department", "name _id").sort({ fullName: 1 });
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
    const populatedUser = await Admin.findById(user._id).populate('department', 'name _id')
    res.send(populatedUser);
};

const updateAdmin = async (req, res) => {
    try {
        
        const { error } = updateAdminValidator(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // Find the existing admin user
        const oldUser = await Admin.findById(req.params.id);
        if (!oldUser) return res.status(404).send("Admin user not found!");

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

        // Update the admin user document
        let updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            _.pick(req.body, ["fullName", "email", "phone", "department"]),
            { new: true }
        );

        if (!updatedAdmin) return res.status(404).send("Admin user not found!");

        // Populate the department field and send the response
        const populatedAdmin = await Admin.findById(updatedAdmin._id).populate('department', 'name _id');
        res.send(populatedAdmin);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};


const deleteAdmin = async (req, res) => {
    const user = await Admin.findByIdAndUpdate(req.params.id, {isActive: false});
    if (!user) return res.status(404).send("User not Found!");
    await Email.deleteOne({ email: user.email });
    res.send(user)
   
};

const getById = async (req, res) => {
    const user = await Admin.findById(req.params.id);
    if (!user) return res.status(404).send("User not Found!");
    res.send(user);
};

export { getAdmin, addAdmin, updateAdmin, deleteAdmin, getById };
