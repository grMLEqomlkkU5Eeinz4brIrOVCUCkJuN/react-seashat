import { Request, Response, NextFunction } from "express";
import { z } from "zod";
interface ValidationSchema {
    body?: z.ZodSchema;
    query?: z.ZodSchema;
    params?: z.ZodSchema;
}
export declare const validate: (schema: ValidationSchema) => (req: Request, _res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate.d.ts.map