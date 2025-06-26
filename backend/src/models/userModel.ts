import mongoose, { Document, Model, Types } from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
import crypto from "crypto"

export interface IUser extends Document {
  _id: Types.ObjectId
  email: string
  password: string
  confirmPassword?: string
  passwordChangedAt: Date
  passwordResetToken?: string
  passwordResetExpires?: Date
  photo: string
  role: string
  phone?: string
  cart: Types.ObjectId
  firstName: string
  lastName: string
  active: boolean
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>
  changedPasswordAfter(JWTTimeStamp: number): Promise<boolean>
  createPasswordResetToken(): string
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "User must have an email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm the password"],
      validate: {
        validator: function (this: IUser, el: string) {
          return el === this.password
        },
        message: "Passwords do not match",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: {
      type: String,
    },

    passwordResetExpires: {
      type: Date,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: String,
    cart: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
      required: [true, "User must have a cart"],
    },
    firstName: {
      type: String,
      required: [true, "User must have a first name"],
    },
    lastName: {
      type: String,
      required: [true, "User must have a last name"],
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
)

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 14)
  this.confirmPassword = undefined
  next()
})

userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next()

  this.passwordChangedAt = new Date(Date.now() - 1000)
  next()
})

userSchema.pre(/^find/, function (this: mongoose.Query<any, IUser>, next) {
  this.find({ active: { $ne: false } })
  next()
})

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = async function (
  JWTTimeStamp: number
): Promise<boolean> {
  if (this.passwordChangedAt) {
    const changedTimestamp = this.passwordChangedAt.getTime() / 1000
    return JWTTimeStamp < changedTimestamp
  }

  return false
}

userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex")

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)

export default User
