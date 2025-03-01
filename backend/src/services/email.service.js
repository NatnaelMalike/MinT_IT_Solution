import nodemailer from "nodemailer";
import config from "../config/config.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: config.emailUser,
      to,
      subject,
      html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
