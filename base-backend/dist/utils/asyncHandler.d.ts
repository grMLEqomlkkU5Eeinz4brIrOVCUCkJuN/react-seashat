import { Request, Response, NextFunction, RequestHandler } from "express";
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => void | Response | Promise<void | Response>;
/**
 * Wraps async route handlers to catch errors and pass them to Express error middleware.
 */
declare const asyncHandler: (fn: AsyncRequestHandler) => RequestHandler;
export default asyncHandler;
//# sourceMappingURL=asyncHandler.d.ts.map