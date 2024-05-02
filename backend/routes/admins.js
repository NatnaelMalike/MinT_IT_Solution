import express from "express";
import { Admin, adminValidator } from "../models/admin.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await Admin.find();
    res.send(users);
});

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



router.put("/:id", async (req, res) => {
    const { error } = adminValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await Admin.findByIdAndUpdate(
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
    if(!user) return res.status(404).send('User not Found!')
    res.send(user)

});

router.delete('/:id', async (req, res) => {
    const user = await Admin.findByIdAndDelete(req.params.id)
    if(!user) return res.status(404).send('User not Found!')
    res.send(user)

})

export default router;
