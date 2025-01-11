import jwt from "jsonwebtoken";

const generateAuthToken = (
  _id,
  role,
  remember
) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: remember ? "7d" : "7d",
  });
};
export { generateAuthToken };
