import { Request, Response, NextFunction, RequestHandler } from "express"

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>

/**
 * Wraps an async Express route handler and forwards any error to next().
 */
const catchAsync = (fn: AsyncRouteHandler): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

export default catchAsync
