export default (req, res, next) => {
    if (req.user.role !== "technician")
        return res.status(403).send("Access Denied only for Technicians!!!");
    next();
};
