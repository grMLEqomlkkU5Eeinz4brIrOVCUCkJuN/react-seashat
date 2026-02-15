"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = exports.AppError = void 0;
const env_1 = require("../config/env");
const logger_1 = __importDefault(require("../utils/logger"));
class AppError extends Error {
    statusCode;
    message;
    isOperational;
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, _next) => {
    const isAppError = err instanceof AppError;
    const statusCode = isAppError ? err.statusCode : 500;
    const isOperational = isAppError ? err.isOperational : false;
    logger_1.default.error(err.message, {
        statusCode,
        stack: err.stack,
        path: req.path,
        method: req.method,
        isOperational,
    });
    res.status(statusCode).json({
        success: false,
        message: isOperational ? err.message : "Internal server error",
        ...(env_1.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, _res, next) => {
    next(new AppError(404, `Route not found: ${req.method} ${req.path}`));
};
exports.notFoundHandler = notFoundHandler;
//# sourceMappingURL=errorHandler.js.map