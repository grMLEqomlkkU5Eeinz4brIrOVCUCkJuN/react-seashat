"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("utils/helpers");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]).default("development"),
    PORT: zod_1.z.coerce.number().default(3000),
    LOG_LEVEL: zod_1.z.enum(["error", "warn", "info", "http", "verbose", "debug", "silly"]).default("info"),
    SERVICE_NAME: zod_1.z.string().default("base-backend"),
    MAX_LOG_SIZE: zod_1.z.string().default("20m"),
    MAX_LOG_FILES: zod_1.z.string().default("14d"),
    COMPRESS_LOGS: zod_1.z
        .enum(["true", "false"])
        .default("true")
        .transform((val) => val === "true"),
    // CORS configuration
    CORS_ORIGIN: zod_1.z
        .string()
        .default("*")
        .transform((val) => (val === "*" ? "*" : (0, helpers_1.stringToArray)(val))),
    CORS_METHODS: zod_1.z
        .string()
        .default("GET,POST,PUT,PATCH,DELETE,OPTIONS")
        .transform(helpers_1.stringToArray),
    CORS_CREDENTIALS: zod_1.z
        .enum(["true", "false"])
        .default("false")
        .transform((val) => val === "true"),
    // Security configuration
    RATE_LIMIT_WINDOW_MS: zod_1.z.coerce.number().default(900000), // 15 minutes
    RATE_LIMIT_MAX: zod_1.z.coerce.number().default(100),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("Invalid environment variables:", zod_1.z.flattenError(parsed.error).fieldErrors);
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map