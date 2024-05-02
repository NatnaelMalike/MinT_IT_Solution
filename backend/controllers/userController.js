import { User, userValidator } from "../models/user.js";

const getUser = async (req, res) => {
    const users = await User.find().sort({ fullName: 1 });
    res.send(users);
};

const addUser = async (req, res) => {
    const { error } = userValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        department: req.body.department,
        phone: req.body.phone,
    });
    await user.save();
    res.send(user);
};

const updateUser = async (req, res) => {
    const { error } = userValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            department: req.body.department,
            phone: req.body.phone,
        },
        {
            new: true,
        }
    );
    if (!user) return res.status(404).send("User not Found!");
    res.send(user);
};

const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not Found!");
    res.send(user);
};
export {getUser, addUser, updateUser, deleteUser};