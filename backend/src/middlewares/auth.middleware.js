import passport from "passport";

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err) {
    return reject(err);
  }

  if (info) {
    return reject(new Error(info.message || "Please authenticate")); 
  }

  if (!user) {
    return reject(new Error("Invalid token or user not found"));
  }

  req.user = user;
  resolve();
};

const auth = async (req, res, next) => {
  try {
    await new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject)
      )(req, res, next);
    });

    next();
  } catch (error) {
    res.status(401).json({ message: error.message || "Unauthorized" });
  }
};

export default auth;
