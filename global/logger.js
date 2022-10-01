const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const Session = require('./session');
const { combine, timestamp ,printf} = winston.format;
const logConfig = require('../config/log');

function getLoggerConfig(logger_name, level) {
    const log_path = "logs";
    const logger_obj = {
        level: level,
        format: combine(
            timestamp({
                format: "YYYY-MM-DD HH:mm:ss",
            }),
            printf(({ level, message, timestamp,keywords,requestId }) => {
                level = level.toUpperCase();
                let message_str = typeof message == 'object'?JSON.stringify(message):message;
                return `${requestId} | ${timestamp} | ${level} | ${keywords} | ${message_str}`;
            }),
        ),
        transports: [
            new DailyRotateFile({
                filename: log_path + "/" + logger_name + "/%DATE%.log",
                datePattern: "YYYY-MM-DD",
                //zippedArchive: true,
                maxSize: null, //20m
                maxFiles: "14d",
            }),
        ],
    };
    return logger_obj;
}

class _Logger {
    logger = '';
    /**
     * 
     * @param {winston.Logger} winston_logger 
     */
    constructor(winston_logger) {
        this.winston_logger = winston_logger;
    }
    async debug(keywords, message) {
        this._log("debug", keywords, message);
    }

    async info(keywords, message) {
        this._log("info", keywords, message);
    }
    async warn(keywords, message) {
        this._log("warn", keywords, message);
    }
    async error(keywords, message) {
        this._log("error", keywords, message);
    }
    async _log(level, keywords, message) {
        let requestId = await Session.get('requestId')+'';
        this.winston_logger.log(level,message,{keywords:keywords,requestId:requestId});
    }
}


const accessLogger = new _Logger(winston.createLogger(getLoggerConfig("access_log",'info')));
const Logger = new _Logger(winston.createLogger(getLoggerConfig("app",logConfig.level)));
const errorLogger = new _Logger(winston.createLogger(getLoggerConfig("error",'error')));

module.exports = {
    accessLogger,
    Logger,
    errorLogger
}