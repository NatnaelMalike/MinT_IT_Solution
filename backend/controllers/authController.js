import Joi from "joi";
import { User } from "../models/user.js";
import { Admin } from "../models/admin.js";
import { Technician } from "../models/technician.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validator(req.body);
  if (error) return res.status(400).send(error.details[0].message);
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
    return res.status(400).send("Incorrect email or Password");
  }
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).send("Incorrect email or Password");
  if (!user.isActive) return res.status(400).send("Your account is not active");
  const token = user.generateAuthToken();
  res.send(token);
};

function validator(credentials) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(credentials);
}
export default login;
