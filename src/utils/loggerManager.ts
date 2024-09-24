// src/services/logger.ts
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `core [${level}] ${timestamp}  ${message}`;
});

// Create the Winston logger
const logger = createLogger({
  format: combine(
    timestamp(),
    colorize(),  // Colorize logs in the console
    logFormat    // Apply the custom log format
  ),
  transports: [
    new transports.Console(),  // Logs to the console
    new transports.File({ filename: 'logs/app.log' })  // Logs to a file
  ]
});

export default logger;
