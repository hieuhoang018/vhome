import { Request, Response } from "express"
import Product from "../models/productModel"
import { APIFeatures } from "../utils/apiFeatures"

export const getAllProducts = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.error(err)
    res.status(500).json({
      status: "fail",
      message: "Something went wrong.",
    })
  }
}

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "cant find product",
    })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await Product.create(req.body)

    res.status(201).json({
      status: "success",
      data: {
        product: newProduct,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "cant find",
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    })
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "invalid data",
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndDelete(req.params.id)

    res.status(204).json({
      status: "success",
      data: null,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "cant find product",
    })
  }
}

export const getProductStats = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}
