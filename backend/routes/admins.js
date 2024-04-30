import express from "express";
import { Admin, adminValidator } from "../models/admin.js";

const router = express.Router();

router.post("/", async (req, res) => {
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
});

export default router;
