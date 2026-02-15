"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const env_1 = require("../config/env");
const logDir = path_1.default.join(__dirname, "..", "..", "logs");
const consoleFormat = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
        msg += ` ${JSON.stringify(meta)}`;
    }
    return msg;
}));
const fileFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(meta).length > 0) {
        msg += ` ${JSON.stringify(meta)}`;
    }
    return msg;
}));
const fileTransportOptions = {
    datePattern: "YYYY-MM-DD",
    maxSize: env_1.env.MAX_LOG_SIZE,
    maxFiles: env_1.env.MAX_LOG_FILES,
    zippedArchive: env_1.env.COMPRESS_LOGS,
};
const transports = [
    new winston_1.default.transports.Console({
        level: env_1.env.LOG_LEVEL,
        format: consoleFormat,
    }),
    new winston_daily_rotate_file_1.default({
        ...fileTransportOptions,
        filename: path_1.default.join(logDir, "error-%DATE%.log"),
        level: "error",
        format: fileFormat,
    }),
    new winston_daily_rotate_file_1.default({
        ...fileTransportOptions,
        filename: path_1.default.join(logDir, "combined-%DATE%.log"),
        format: fileFormat,
    }),
];
const logger = winston_1.default.createLogger({
    level: env_1.env.LOG_LEVEL,
    format: fileFormat,
    defaultMeta: { service: env_1.env.SERVICE_NAME },
    transports,
    exceptionHandlers: [
        new winston_daily_rotate_file_1.default({
            ...fileTransportOptions,
            filename: path_1.default.join(logDir, "exceptions-%DATE%.log"),
            format: fileFormat,
        }),
    ],
    rejectionHandlers: [
        new winston_daily_rotate_file_1.default({
            ...fileTransportOptions,
            filename: path_1.default.join(logDir, "rejections-%DATE%.log"),
            format: fileFormat,
        }),
    ],
});
if (env_1.env.NODE_ENV !== "production") {
    logger.exceptions.handle(new winston_1.default.transports.Console({ format: consoleFormat }));
    logger.rejections.handle(new winston_1.default.transports.Console({ format: consoleFormat }));
}
exports.default = logger;
//# sourceMappingURL=logger.js.map