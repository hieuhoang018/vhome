import { NextFunction, Request, Response } from "express"
import Product from "../models/productModel"
import { APIFeatures } from "../utils/apiFeatures"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const features = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort("name")
      .limitFields()
      .paginate()
    const products = await features.query

    res.status(200).json({
      status: "success",
      results: products.length,
      data: { products },
    })
  }
)

export const getProductsById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return next(new AppError("No tour found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    })
  }
)

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const newProduct = await Product.create(req.body)

  res.status(201).json({
    status: "success",
    data: {
      product: newProduct,
    },
  })
})

export const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!product) {
      return next(new AppError("No tour found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    })
  }
)

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return next(new AppError("No tour found with that ID", 404))
    }

    res.status(204).json({
      status: "success",
      data: null,
    })
  }
)

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
