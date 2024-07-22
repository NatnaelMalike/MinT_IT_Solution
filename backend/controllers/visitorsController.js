import { Visitor } from "../models/visitors.js";

const getClientIp = (req) => {
    const forwarded = req.headers["x-forwarded-for"];
    return forwarded ? forwarded.split(",")[0] : req.connection.remoteAddress;
};

export const getVisitors = async (req, res) => {
    const ipAddress = getClientIp(req);

    let visitor = await Visitor.findOne({ ipAddress });

    if (!visitor) {
        visitor = new Visitor({ ipAddress });
        await visitor.save();
        getVisitorCount();
    } else {
        visitor.visitCount++;
        visitor.lastVisit = Date.now();
        await visitor.save();
        getVisitorCount();
    }
};

const getVisitorCount = async () => {
    try {
        const result = await Visitor.aggregate([
            {
                $group: {
                    _id: null,
                    totalVisitCount: { $sum: "$visitCount" },
                },
            },
        ]);

        const totalVisitCount =
            result.length > 0 ? result[0].totalVisitCount : 0;
        res.send({ totalVisitCount });
    } catch (error) {
        res.status(500).send("Error calculating total visit count");
        console.error("Error calculating total visit count", error);
    }
};
