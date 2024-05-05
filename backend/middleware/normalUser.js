export default (req, res, next) => {
    if (req.user.role !== "normal")
        return res.status(403).send("Access Denied only for Workers!!!");
    next();
};
