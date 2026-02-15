"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const env_1 = require("./config/env");
const logger_1 = __importDefault(require("./utils/logger"));
const wordSearch_service_1 = require("./services/wordSearch.service");
const app = (0, app_1.createApp)();
const server = http_1.default.createServer(app);
const shutdown = (signal) => {
    logger_1.default.info(`${signal} received, starting graceful shutdown...`);
    server.close((err) => {
        if (err) {
            logger_1.default.error("Error during server close", { error: err.message });
            process.exit(1);
        }
        logger_1.default.info("Server closed successfully");
        process.exit(0);
    });
    // Force shutdown after timeout
    setTimeout(() => {
        logger_1.default.error("Graceful shutdown timed out, forcing exit");
        process.exit(1);
    }, 10000);
};
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("uncaughtException", (error) => {
    logger_1.default.error("Uncaught exception", { error: error.message, stack: error.stack });
    shutdown("uncaughtException");
});
process.on("unhandledRejection", (reason) => {
    logger_1.default.error("Unhandled rejection", { reason });
    shutdown("unhandledRejection");
});
(0, wordSearch_service_1.initWordSearch)();
server.listen(env_1.env.PORT, () => {
    logger_1.default.info(`Server running on port ${env_1.env.PORT}`);
    logger_1.default.info(`Environment: ${env_1.env.NODE_ENV}`);
    logger_1.default.info(`API docs available at http://localhost:${env_1.env.PORT}/docs`);
});
//# sourceMappingURL=main.js.map