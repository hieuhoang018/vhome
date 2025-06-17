import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/appError"
import catchAsync from "../utils/catchAsync"
import Review from "../models/reviewModel"
import { createOne, deleteOne, getAll, updateOne } from "./handlerFactory"

export const getAllReviews = getAll(Review)

export const getReviewById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findById(req.params.id)

    if (!review) {
      return next(new AppError("No review found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    })
  }
)

export const setProductUserIds = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.product) req.body.product = req.params.productId
  if (!req.body.user) req.body.user = req.user._id

  next()
}

export const createReview = createOne(Review)

export const updateReview = updateOne(Review)

export const deleteReview = deleteOne(Review)
