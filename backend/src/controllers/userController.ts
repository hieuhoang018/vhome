import { NextFunction, Request, Response } from "express"
import User, { IUser } from "../models/userModel"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import { createOne, deleteOne, getAll, updateOne } from "./handlerFactory"
import multer, { FileFilterCallback } from "multer"
import sharp from "sharp"
import Product from "../models/productModel"
import Cart, { CartDocument } from "../models/cartModel"
import Wishlist, { WishlistDocument } from "../models/wishlistModel"

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/img/users")
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1]
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`)
//   },
// })

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

export const uploadUserPhoto = upload.single("photo")

export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next()

    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`)

    next()
  }
)

const filterObj = <T extends Record<string, any>>(
  obj: T,
  ...allowedFields: string[]
): Record<string, any> => {
  const newObj: Record<string, any> = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el]
    }
  })
  return newObj
}

export const getAllUsers = getAll(User)

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  req.params.id = req.user.id
  next()
}

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      return next(new AppError("No data provided", 400))
    }

    if (req.body.password || req.body.confirmPassword) {
      return next(
        new AppError(
          "This route is not for password update. Please use /update-password",
          400
        )
      )
    }
    const allowedFields = ["firstName", "lastName", "email", "phone"]
    const filteredBody: any = {}

    allowedFields.forEach((field) => {
      const value = req.body[field]
      if (value !== undefined && value !== "") {
        filteredBody[field] = value
      }
    })

    if (req.file) filteredBody.photo = req.file.filename

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!updatedUser) {
      return next(new AppError("Cant find user", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    })
  }
)

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

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser: IUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      phone: req.body.phone || "",
      // cart: cart._id,
      // wishlist: wishlist._id,
    })

    const cart: CartDocument = await Cart.create({})
    const wishlist: WishlistDocument = await Wishlist.create({})

    newUser.cart = cart._id
    newUser.wishlist = wishlist._id

    cart.user = newUser._id
    await cart.save()

    wishlist.user = newUser._id
    await wishlist.save()

    res.status(201).json({
      status: "success",
      data: {
        data: newUser,
      },
    })
  }
)

export const updateUser = updateOne(User)

export const deleteUser = deleteOne(User)

export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user.id, { active: false })

    res.status(204).json({
      status: "success",
      data: null,
    })
  }
)
