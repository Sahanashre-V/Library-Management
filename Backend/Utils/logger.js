const winston = require('winston');
const path = require('path');

const logFilePath = process.env.LOG_FILE_PATH || path.join(__dirname, '..', 'logs', 'app.log');

const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}] [${info.functionName || 'unknown'}] - ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: logFilePath })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}] [${info.functionName || 'unknown'}] - ${info.message}`)
    )
  }));
}

module.exports = logger;
