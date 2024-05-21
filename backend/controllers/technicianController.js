import {Technician, UpdateTechValidator, techValidator} from "../models/technician.js";
import bcrypt from "bcrypt";
import _ from "lodash";

const getTechnician = async (req, res) => {
    const users = await Technician.find();
    res.send(users);
};

const addTechnician = async (req, res) => {
    const { error } = techValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await Technician.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User Already Registered !!!");
    user = new Technician(_.pick(req.body, ["fullName", "email", "password", "department", "phone"]));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken()
    // res.header('x-auth-token',token).send(_.pick(user, ["fullName", "email", "password", "department", "phone"]));
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000
    });
    res.send(_.pick(user, ["fullName", "email", "password", "department", "phone"]))
};

const updateTechnician = async (req, res) => {
    const { error } = UpdateTechValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await Technician.findByIdAndUpdate(
        req.params.id,
        _.pick(req.body, ["fullName", "email", "department", "phone"]),
        {
            new: true,
        }
    );
    if (!user) return res.status(404).send("User not Found!");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    res.send(user);
};

const deleteTechnician = async (req, res) => {
    const user = await Technician.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("User not Found!");
    res.send(user);
};
const getById = async(req, res)=>{
    const user = await Technician.findById(req.params.id);
    if (!user) return res.status(404).send("User not Found!");
    res.send(user)
}

export { getTechnician, addTechnician, updateTechnician, deleteTechnician, getById };
