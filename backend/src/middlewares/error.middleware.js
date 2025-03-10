import { logger } from "../config/logger.js";

export function errorHandler(err, req, res, next) {
    logger.info(err.stack || err.message); ;
    res.status(err.status || 500).json({
        message: err.message || "Something went wrong!",
    });
}
export function unExpectedErrorHandler(err) {
    logger.error(err.stack || err.message);
    process.exit(1)
}
export function unHandledRejectionHandler(err) {
    logger.error(err.stack || err.message);
    process.exit(1)
}