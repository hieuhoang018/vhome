import { Model, HydratedDocument } from "mongoose"
import { Request, Response, NextFunction } from "express"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"

export const deleteOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id)

    if (!doc) {
      return next(new AppError("No document found with that ID", 404))
    }

    res.status(204).json({
      status: "success",
      data: null,
    })
  })
