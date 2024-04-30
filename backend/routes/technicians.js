import express from "express";
import {Technician, techValidator} from "../models/technician.js";
const router = express.Router()
router.post("/", async (req, res) => {
    const {error} = techValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message)
    const user = new Technician({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        department: req.body.department,
        phone: req.body.phone,
    });
    await user.save();
    res.send(user);
});

export default router