import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import User, { IUser } from "../models/userModel"

const signToken = ({ id }: { id: string }): string => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new AppError("JWT_SECRET is not defined", 500)
  }

  return jwt.sign({ id }, jwtSecret, { expiresIn: "5000" })
}

function verifyToken(token: string, secret: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded as JwtPayload)
    })
  })
}

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
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

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token
    // 1) Getting token and checking of its there
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
    }
    console.log(token)

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access", 401)
      )
    }
    // 2) Verify token
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      return next(
        new AppError("JWT_SECRET is not defined in environment variables", 500)
      )
    }

    const decoded = await verifyToken(token, jwtSecret)
    const issuedAt = decoded.iat
    if (!issuedAt) {
      return next(new AppError("JWT error", 500))
    }
    // 3) Check if user still exists
    const freshUser = await User.findById(decoded.id)
    if (!freshUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist",
          401
        )
      )
    }

    // 4) Check if user changed password after token was issued
    if (await freshUser.changedPasswordAfter(issuedAt)) {
      return next(
        new AppError("User recently changed password! Please log in again", 401)
      )
    }

    next()
  }
)
