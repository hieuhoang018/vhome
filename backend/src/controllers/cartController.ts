import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import { createOne, deleteOne, getAll, updateOne } from "./handlerFactory"
import Cart from "../models/cartModel"

export const getAllCarts = getAll(Cart)

export const getCartById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cart = await Cart.findById(req.params.id)

    if (!cart) {
      return next(new AppError("No cart found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    })
  }
)

export const createCart = createOne(Cart)

export const updateCart = updateOne(Cart)

export const deleteCart = deleteOne(Cart)


