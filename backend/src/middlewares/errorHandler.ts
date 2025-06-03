import { Request, Response, NextFunction } from "express"

interface CustomError extends Error {
  statusCode?: number
  status?: string
  isOperational?: boolean
}

const sendErrorDev = (err: CustomError, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    error: err,
    stack: err.stack,
  })
}

const sendErrorProd = (err: CustomError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode!).json({
      status: err.status,
      message: err.message,
    })
  } else {
    console.error("❌ ERROR:", err)

    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    })
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res)
  } else {
    sendErrorProd(err, res)
  }
}
