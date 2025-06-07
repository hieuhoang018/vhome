import mongoose, { Document, Model, Types } from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  _id: Types.ObjectId
  email: string
  password: string
  confirmPassword?: string
  passwordChangedAt: Date
  phone?: string
  cart: number[]
  firstName: string
  lastName: string
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>
  changedPasswordAfter(JWTTimeStamp: number): Promise<boolean>
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
    phone: String,
    cart: {
      type: [Number],
      default: [],
    },
    firstName: {
      type: String,
      required: [true, "User must have a first name"],
    },
    lastName: {
      type: String,
      required: [true, "User must have a last name"],
    },
  },
  {
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

userSchema.virtual("fullName").get(function (this: IUser) {
  return this.firstName + " " + this.lastName
})

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 14)
  this.confirmPassword = undefined
  next()
})

userSchema.pre<IUser>("save", function (next) {
  if (!this.isModified("password")) return next()

  this.passwordChangedAt = new Date(Date.now() - 1000)
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

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema)

export default User
