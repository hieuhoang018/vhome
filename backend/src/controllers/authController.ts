import jwt, { SignOptions, Secret, JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import User, { IUser } from "../models/userModel"

const signToken = ({ id }: { id: string }): string => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new AppError("JWT_SECRET is not defined", 500)
  }

  return jwt.sign({ id }, jwtSecret, { expiresIn: "90d" })
}

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser: IUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })

    let token: string
    try {
      token = signToken({ id: newUser._id.toString() })
    } catch (err) {
      console.error("JWT signing error:", err)
      return next(new AppError("Token generation failed", 500))
    }

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    })
  }
)

export const logIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400))
    }

    const user = await User.findOne({ email }).select("+password")

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401))
    }

    const token = signToken({ id: user._id.toString() })
    res.status(200).json({
      status: "success",
      token,
    })
  }
)
