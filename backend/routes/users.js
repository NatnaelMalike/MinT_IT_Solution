import express from 'express';
import Admin from '../models/admin.js';
import User from '../models/user.js';
import Technician from '../models/technician.js';
const router = express.Router();


router.post('/admin', async (req, res) => {
const user = new Admin({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
})
await user.save()
res.send(user)
})

router.post('/user', async (req, res) => {
const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    department: req.body.department,
    phone: req.body.phone
})
await user.save()
res.send(user)
})

router.post('/technician', async (req, res) => {
const user = new Technician({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    department: req.body.department,
    phone: req.body.phone
})
await user.save()
res.send(user)
})

export default router