import { NextFunction, Request, Response } from "express"
import Product from "../models/productModel"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import { createOne, deleteOne, getAll, updateOne } from "./handlerFactory"
import multer, { FileFilterCallback } from "multer"
import sharp from "sharp"

type MulterFiles = {
  imageCoverUrl?: Express.Multer.File[]
  imagesUrl?: Express.Multer.File[]
}

const multerStorage = multer.memoryStorage()

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true)
  } else {
    cb(new AppError("Not an image! Please upload only images", 400))
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

export const uploadProductImages = upload.fields([
  { name: "imageCoverUrl", maxCount: 1 },
  { name: "imagesUrl", maxCount: 3 },
])

export const resizeProductPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as MulterFiles
    if (!files.imageCoverUrl || !files.imagesUrl) return next()

    req.body.imageCoverUrl = `product-${req.params.id}-${Date.now()}-cover.jpeg`
    const imageCover = files.imageCoverUrl[0]
    await sharp(imageCover.buffer)
      .resize(500, 500) // do this resize again
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/products/${req.body.imageCoverUrl}`)

    req.body.imagesUrl = []

    await Promise.all(
      files.imagesUrl.map(async (file, i) => {
        const filename = `product-${req.params.id}-${Date.now()}-${i + 1}.jpeg`
        await sharp(file.buffer)
          .resize(500, 500) // do this resize again
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/img/products/${filename}`)

        req.body.imagesUrl.push(filename)
      })
    )

    console.log(req.body);
    next()
  }
)

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
