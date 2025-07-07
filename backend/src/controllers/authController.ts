import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import User, { IUser } from "../models/userModel"
import { sendEmail } from "../utils/email"
import crypto from "crypto"
import Cart, { CartDocument } from "../models/cartModel"
import Wishlist, { WishlistDocument } from "../models/wishlistModel"

const signToken = ({ id }: { id: string }): string => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new AppError("JWT_SECRET is not defined", 500)
  }

  return jwt.sign({ id }, jwtSecret, { expiresIn: "1d" })
}

const verifyToken = (token: string, secret: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err)
      resolve(decoded as JwtPayload)
    })
  })
}

const createSendToken = (
  user: IUser,
  statusCode: number,
  res: Response,
  next: NextFunction
) => {
  const token = signToken({ id: user._id.toString() })
  const jwtCookieExpires = process.env.JWT_COOKIE_EXPIRES_IN

  if (!jwtCookieExpires) {
    return next(new AppError("JWT cookie expiration error", 500))
  }

  const expiresInDays = parseInt(jwtCookieExpires)
  const sameSiteOption: "lax" | "strict" | "none" =
    process.env.NODE_ENV === "production" ? "none" : "lax"

  const cookieOptions = {
    expires: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: sameSiteOption,
  }

  res.cookie("jwt", token, cookieOptions)

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  })
}

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cart: CartDocument = await Cart.create({})
    const wishlist: WishlistDocument = await Wishlist.create({})

    const newUser: IUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      cart: cart._id,
      wishlist: wishlist._id,
    })

    cart.user = newUser._id
    await cart.save()

    wishlist.user = newUser._id
    await wishlist.save()

    createSendToken(newUser, 201, res, next)
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

    createSendToken(user, 200, res, next)
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
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt
    }

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

    req.user = freshUser
    next()
  }
)

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      )
    }

    next()
  }
}

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return next(new AppError("Can't find user with the email address", 404))
    }

    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetpassword/${resetToken}`

    const message = `Forgot your password? Submit a PATCH request with your new password and password confirmation to ${resetURL}.\nIf you didn't, please ignore this.`

    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (Valid for 10 minutes)",
        message,
      })

      res.status(200).json({
        status: "success",
        message: "Token sent to email",
      })
    } catch (err) {
      ;(user.passwordResetToken = undefined),
        (user.passwordResetExpires = undefined),
        await user.save({ validateBeforeSave: false })

      return next(
        new AppError("Error sending reset email. Try again later", 500)
      )
    }
  }
)

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex")

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })

    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400))
    }

    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()

    createSendToken(user, 200, res, next)
  }
)

export const updatePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id).select("+password")

    if (!user) {
      return next(new AppError("The user no longer exists", 401))
    }

    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError("Your current password is wrong", 401))
    }

    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword
    await user.save()

    createSendToken(user, 200, res, next)
  }
)

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000), // Expire the cookie shortly
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  })
}
