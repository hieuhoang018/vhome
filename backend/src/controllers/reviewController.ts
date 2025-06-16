import { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/appError"
import catchAsync from "../utils/catchAsync"
import Review from "../models/reviewModel"
import { deleteOne } from "./handlerFactory"

export const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  let filter = {}
  if (req.params.productId) filter = { product: req.params.productId }
  const reviews = await Review.find(filter)

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: { reviews },
  })
})

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

export const createReview = catchAsync(async (req: Request, res: Response) => {
  if (!req.body.product) req.body.product = req.params.product
  if (!req.body.user) req.body.user = req.params.user

  const newReview = await Review.create(req.body)

  res.status(201).json({
    status: "success",
    data: {
      newReview,
    },
  })
})

export const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

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

export const deleteReview = deleteOne(Review)
