import { NextFunction, Request, Response } from "express"
import User from "../models/userModel"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await User.find()

  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  })
})

export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id)

    if (!user) {
      return next(new AppError("No user found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    })
  }
)

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const newUser = await User.create(req.body)

  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  })
})

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!user) {
      return next(new AppError("No product found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    })
  }
)

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return next(new AppError("No product found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: null,
    })
  }
)
