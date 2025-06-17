import { NextFunction, Request, Response } from "express"
import Product from "../models/productModel"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import { createOne, deleteOne, getAll, updateOne } from "./handlerFactory"

export const getAllProducts = getAll(Product)

export const getProductsById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id).populate("reviews")

    if (!product) {
      return next(new AppError("No product found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    })
  }
)

export const createProduct = createOne(Product)

export const updateProduct = updateOne(Product)

export const deleteProduct = deleteOne(Product)

export const getProductStats = catchAsync(
  async (req: Request, res: Response) => {
    const stats = await Product.aggregate([
      {
        $match: { price: { $gte: 100 } },
      },
      {
        $group: {
          _id: { $toUpper: "$category" },
          numProducts: { $sum: 1 },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
      // {
      //   $match: { _id: { $ne: "OUTDOOR" } },
      // },
    ])

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    })
  }
)
