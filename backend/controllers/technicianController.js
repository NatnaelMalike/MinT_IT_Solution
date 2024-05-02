import {Technician, techValidator} from "../models/technician.js";

const getTechnician = async (req, res) => {
    const users = await Technician.find();
    res.send(users);
};

const addTechnician = async (req, res) => {
    const { error } = techValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = new Technician({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        department: req.body.department,
        phone: req.body.phone,
    });
    await user.save();
    res.send(user);
};

const updateTechnician = async (req, res) => {
    const { error } = techValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await Technician.findByIdAndUpdate(
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

const deleteTechnician = async (req, res) => {
    const user = await Technician.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not Found!");
    res.send(user);
};

export { getTechnician, addTechnician, updateTechnician, deleteTechnician };
