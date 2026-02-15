import { z } from "zod";
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        production: "production";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    LOG_LEVEL: z.ZodDefault<z.ZodEnum<{
        error: "error";
        warn: "warn";
        info: "info";
        http: "http";
        verbose: "verbose";
        debug: "debug";
        silly: "silly";
    }>>;
    SERVICE_NAME: z.ZodDefault<z.ZodString>;
    MAX_LOG_SIZE: z.ZodDefault<z.ZodString>;
    MAX_LOG_FILES: z.ZodDefault<z.ZodString>;
    COMPRESS_LOGS: z.ZodPipe<z.ZodDefault<z.ZodEnum<{
        true: "true";
        false: "false";
    }>>, z.ZodTransform<boolean, "true" | "false">>;
    CORS_ORIGIN: z.ZodPipe<z.ZodDefault<z.ZodString>, z.ZodTransform<string[] | "*", string>>;
    CORS_METHODS: z.ZodPipe<z.ZodDefault<z.ZodString>, z.ZodTransform<string[], string>>;
    CORS_CREDENTIALS: z.ZodPipe<z.ZodDefault<z.ZodEnum<{
        true: "true";
        false: "false";
    }>>, z.ZodTransform<boolean, "true" | "false">>;
    RATE_LIMIT_WINDOW_MS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    RATE_LIMIT_MAX: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
export declare const env: {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    LOG_LEVEL: "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";
    SERVICE_NAME: string;
    MAX_LOG_SIZE: string;
    MAX_LOG_FILES: string;
    COMPRESS_LOGS: boolean;
    CORS_ORIGIN: string[] | "*";
    CORS_METHODS: string[];
    CORS_CREDENTIALS: boolean;
    RATE_LIMIT_WINDOW_MS: number;
    RATE_LIMIT_MAX: number;
};
export {};
//# sourceMappingURL=env.d.ts.map