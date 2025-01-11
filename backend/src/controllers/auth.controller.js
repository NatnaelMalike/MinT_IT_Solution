import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../services/token.service.js";
import { ProfileDTO } from "../dtos/profile.dto.js";


const signup = async (req, res) => {
  try {
    // const { error } = userSchema.body.validate(req.body);
    // if (error) {
    //   res.status(400).send(error.details[0].message);
    //   return;
    // }
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(400).json({message: "Email already exists"});
      return;
    }

    const user = await User.create({
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10),
    });
    const token = generateAuthToken(user._id, user.role, false);
    res.status(201).json({ user: ProfileDTO.fromUser(user), token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const signin = async (req, res) => {
  // const { error } = loginSchema.body.validate(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  const { email, password, remember } = req.body

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).send("Invalid credentials");
    return;
  }

  const isValidPassword = await bcrypt.compare(
    password,
    user.password
  );
  if (!isValidPassword) {
    res.status(401).send("Invalid credentials");
    return;
  }

  const token = generateAuthToken(user._id, user.role, remember);

  res.status(200).json({ user: ProfileDTO.fromUser(user), token });
};
export { signup, signin };
