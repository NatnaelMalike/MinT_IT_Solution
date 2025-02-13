import { logger } from "../logger.js";

export default function errorHandler(err, req, res, next) {
    logger.info(err.stack || err.message); ;
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong!",
    });
}
