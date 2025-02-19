import winston from 'winston';
import config from './config.js';
const { format, createLogger, transports } = winston;
const { combine, timestamp, printf, colorize } = format;
 
const winstonFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}: ${level}: ${stack || message}`;
});
 
const logger = createLogger({
  level: config.env == 'development'? 'debug': 'info',
  format: combine(
    timestamp(),
    winstonFormat,
    colorize()
  ),
  transports: [new transports.Console(),   new (winston.transports.File)({ filename: 'logfile.log' })],
});
 
export {logger};