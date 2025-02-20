import passport from "passport";

const authorizeRole = (requiredRole) => (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ message: "You are not authorized to access this resource" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

const userMiddleware = authorizeRole("NormalUser");
const adminMiddleware = authorizeRole("SuperAdmin");
const helperMiddleware = authorizeRole("HelperAdmin");
const technicianMiddleware = authorizeRole("TechnicianUser");

export { userMiddleware, adminMiddleware, helperMiddleware, technicianMiddleware };
