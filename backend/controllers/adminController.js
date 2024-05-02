import { Admin, adminValidator } from "../models/admin.js";

const getAdmin = async (req, res) => {
    const users = await Admin.find();
    res.send(users);
};

const addAdmin = async (req, res) => {
    const { error } = adminValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = new Admin({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
    });
    await user.save();
    res.send(user);
};

const updateAdmin = async (req, res) => {
    const { error } = adminValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await Admin.findByIdAndUpdate(
        req.params.id,
        {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
        },
        {
            new: true,
        }
    );
    if (!user) return res.status(404).send("User not Found!");
    res.send(user);
};

const deleteAdmin = async (req, res) => {
    const user = await Admin.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not Found!");
    res.send(user);
};

export { getAdmin, addAdmin, updateAdmin, deleteAdmin };
