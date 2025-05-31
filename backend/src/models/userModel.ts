import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have a username"],
      unique: [true, "Username must be unique"],
    },
    email: {
      type: String,
      required: [true, "User must have a email"],
      unique: [true, "Email must be unique"],
    },
    phone: {
      type: String,
    },
    cart: {
      type: [Number],
      default: [],
    },
    firstName: {
      type: String,
      required: [true, "User must have an firstname"],
    },
    lastName: {
      type: String,
      required: [true, "User must have an lastname"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

userSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName
})

userSchema.pre(/^save/, function () {})

const User = mongoose.model("User", userSchema)

export default User
