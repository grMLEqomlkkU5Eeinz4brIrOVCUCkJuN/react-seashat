"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
/**
 * Wraps async route handlers to catch errors and pass them to Express error middleware.
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            logger_1.default.error(`Route handler error: ${fn.name || "anonymous"}`, {
                message: error.message,
                stack: error.stack,
                path: req.path,
                method: req.method,
            });
            next(error);
        });
    };
};
exports.default = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map