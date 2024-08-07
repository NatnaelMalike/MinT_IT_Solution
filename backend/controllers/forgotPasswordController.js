import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { Admin } from "../models/admin.js";
import { User } from "../models/user.js";
import { Technician } from "../models/technician.js";
import Email from "../models/Email.js";

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let userEmail = await Email.findOne({ email });

        if (!userEmail) {
            return res.status(400).send("User Does not Exist!");
        }
    //     const transporter = nodemailer.createTransport({
    //         service: "gmail",
    //         auth: {
    //             user: "natnaelmalike@gmail.com",
    //             pass: "kiwl fjwm bkvs dtgu",
    //         },
    //     });

    //     const mailOptions = {
    //         from: "MinT IT Solution",
    //         to: email,
    //         subject: "Reset Password Notification",
    //         html: `<h1>Reset Your Password</h1>
    // <p>Click on the following link to reset your password:</p>
    // <a href="http://localhost:5173/reset-password/${email}">http://localhost:5173/reset-password/${email}</a>
    // <p>If you didn't request a password reset, please ignore this email.</p>`,
    //     };

    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log("Email sent: " + info.response);
    //         }
    //     });
        res.status(200).send(email);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const resetPassword = async (req, res) => {
    try {
        let email = req.params.email;
        if (!email) {
            return res.status(401).send("Email required");
        }

        let user = await Admin.findOne({ email });

        if (!user) {
            user = await User.findOne({ email });
        }

        if (!user) {
            user = await Technician.findOne({ email });
        }
        if (!user) {
            return res.status(400).send("User Not Found!");
        }
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(req.body.password, salt);

        await user.save();

        res.status(200).send("Password updated");
    } catch (error) {
        res.status(500).send(error.message);
    }
};
export { forgotPassword, resetPassword };
