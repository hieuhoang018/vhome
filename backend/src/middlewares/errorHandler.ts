import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/appError"

interface MongooseCastError extends AppError {
  path: string
  value: string
}

interface MongooseDuplicationError extends AppError {
  errmsg: string
}

interface MongooseValidationError extends AppError {
  errors: {
    [key: string]: {
      message: string
      name?: string
      kind?: string
      path?: string
      properties?: any
    }
  }
}

const handleCastErrorDB = (err: MongooseCastError) => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleDuplicateFieldsDB = (err: MongooseDuplicationError) => {
  const match = err.errmsg.match(/(["'])(\\?.)*?\1/)
  if (!match) {
    return new AppError("Duplicate field value. Please use another value.", 400)
  }

  const value = match[0]
  const message = `Duplicate field value: ${value}. Please use another value`
  return new AppError(message, 400)
}

const handleValidationErrorDB = (err: MongooseValidationError) => {
  const errors = Object.values(err.errors).map((error) => error.message)

  const message = `Invalid input data. ${errors.join(". ")}`
  return new AppError(message, 400)
}

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    error: err,
    stack: err.stack,
  })
}

const sendErrorProd = (err: AppError, res: Response) => {
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
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || "error"

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res)
  } else {
    let error = err as any

    if (error.name === "CastError") error = handleCastErrorDB(error)
    if (error.code === 11000) error = handleDuplicateFieldsDB(error)
    if (error.name === "ValidationError") error = handleValidationErrorDB(error)
    sendErrorProd(error, res)
  }
}
