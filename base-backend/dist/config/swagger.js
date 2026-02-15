"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const env_1 = require("./env");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: env_1.env.SERVICE_NAME,
            version: "1.0.0",
            description: "API documentation",
        },
        servers: [
            {
                url: `/api/v1`,
                description: "API v1",
            },
        ],
    },
    apis: ["./src/routes/api/v1/*.routes.ts"],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map