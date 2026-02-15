"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const env_1 = require("./config/env");
const httpLogger_1 = require("./middleware/httpLogger");
const errorHandler_1 = require("./middleware/errorHandler");
const routes_1 = __importDefault(require("./routes"));
const createApp = () => {
    const app = (0, express_1.default)();
    // Security middleware
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: env_1.env.NODE_ENV === "production",
        crossOriginEmbedderPolicy: env_1.env.NODE_ENV === "production",
    }));
    app.use((0, cors_1.default)({
        origin: env_1.env.CORS_ORIGIN,
        methods: env_1.env.CORS_METHODS,
        credentials: env_1.env.CORS_CREDENTIALS,
    }));
    // Body parsing
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // HTTP logging
    app.use(httpLogger_1.httpLogger);
    // API documentation
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
    app.get("/docs.json", (_req, res) => res.json(swagger_1.swaggerSpec));
    // Routes (handles /api/v1, etc.)
    app.use(routes_1.default);
    // Error handling
    app.use(errorHandler_1.notFoundHandler);
    app.use(errorHandler_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map