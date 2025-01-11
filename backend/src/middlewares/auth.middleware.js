import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access Denied!, No token Provided" });
    return;
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid authentication token." });
  }
};

export default authMiddleware;
