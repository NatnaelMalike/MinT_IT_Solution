import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.js";
import { User } from "../models/user.js";
import { Technician } from "../models/technician.js";
import _ from "lodash";

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Access Denied!, No token Provided");
  }

  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_JWT_PRIVATE_KEY);
    let user = await Admin.findById(decoded._id);
    if (!user) {
      user = await User.findById(decoded._id);
    }
    if (!user) {
      user = await Technician.findById(decoded._id);
    }
    if (!user) {
      return res.status(400).send("User Not Found!");
    }

    req.user = _.pick(user, ["_id", "role"]);
    next();
  } catch (error) {
    res.status(400).send(`"Invalid Token", ${token}`);
  }
};
