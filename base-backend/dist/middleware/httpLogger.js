"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = void 0;
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("../config/env");
const logger_1 = __importDefault(require("../utils/logger"));
const stream = {
    write: (message) => {
        logger_1.default.http(message.trim());
    },
};
const skip = () => env_1.env.NODE_ENV === "test";
const format = env_1.env.NODE_ENV === "production"
    ? ":remote-addr :method :url :status :res[content-length] - :response-time ms"
    : ":method :url :status :response-time ms";
exports.httpLogger = (0, morgan_1.default)(format, { stream, skip });
//# sourceMappingURL=httpLogger.js.map