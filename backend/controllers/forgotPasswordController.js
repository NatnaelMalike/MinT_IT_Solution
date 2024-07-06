import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Admin } from "../models/admin";
import { User } from "../models/user";
import { Technician } from "../models/technician";

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    const normal = await User.findOne({ email });
    const technician = await Technician.findOne({ email });
    let user;
    if (admin) {
        user = admin;
    } else if (normal) {
        user = normal;
    } else if (technician) {
        user = technician;
    } else {
        return res.status(400).send("Uset Does not Exist!");
    }
    const token = jwt.sign({ userId: user._id }, process.env.ACCESS_JWT_PRIVATE_KEY, {
        expiresIn: "60m",
    });
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "natnaelmalike@gmail.com",
            pass: "amen mk 110694",
        },
    });

    const mailOptions = {
        from: "natnaelmalike@gmail.com",
        to: email,
        subject: "Sending Email using Node.js",
        text: "That was easy!",
        html: `<h1>Reset Your Password</h1>
    <p>Click on the following link to reset your password:</p>
    <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
    <p>The link will expire in 10 minutes.</p>
    <p>If you didn't request a password reset, please ignore this email.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};

const resetPassword = async (req, res) => {
  try {
    
    const decodedToken = jwt.verify(req.params.token, process.env.ACCESS_JWT_PRIVATE_KEY);
    if (!decodedToken) {
      return res.status(401).send("Invalid token");
    }
    let user = await Admin.findById(decodedToken.userId);
    if (!user) {
      user = await User.findById(decodedToken.userId);
    }
    if (!user) {
      user = await Technician.findById(decodedToken.userId);
    }
    if (!user) {
      return res.status(400).send("User Not Found!");
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(200).send( "Password updated" );
  } catch (error) {
    res.status(500).send(error.message)
  }
}
export {forgotPassword, resetPassword}