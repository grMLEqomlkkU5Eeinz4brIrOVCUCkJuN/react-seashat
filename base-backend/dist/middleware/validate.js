"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const errorHandler_1 = require("./errorHandler");
const formatZodError = (error) => {
    return zod_1.z.prettifyError(error);
};
const validate = (schema) => {
    return (req, _res, next) => {
        const locations = ["body", "query", "params"];
        for (const location of locations) {
            const locationSchema = schema[location];
            if (!locationSchema)
                continue;
            const result = locationSchema.safeParse(req[location]);
            if (!result.success) {
                return next(new errorHandler_1.AppError(400, `Validation error in ${location}: ${formatZodError(result.error)}`));
            }
            req[location] = result.data;
        }
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map