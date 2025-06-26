import { NextFunction, Request, Response } from "express"
import User from "../models/userModel"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import { createOne, deleteOne, getAll, updateOne } from "./handlerFactory"
import multer, { FileFilterCallback } from "multer"
import sharp from "sharp"

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
    if (req.body.password || req.body.confirmPassword) {
      return next(
        new AppError(
          "This route is not for password update. Please use /update-password",
          400
        )
      )
    }

    const filteredBody = filterObj(
      req.body,
      "firstName",
      "lastName",
      "email",
      "phone"
    )

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

export const createUser = createOne(User)

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
