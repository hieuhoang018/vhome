import mongoose, { Model, Types } from "mongoose"

export interface IReview {
  _id: Types.ObjectId
  review: string
  rating: number
  createdAt: Date
  product: Types.ObjectId
  user: Types.ObjectId
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    review: {
      type: String,
      required: [true, "A review must have some content"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "A review must have a rating"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Review must belong to a product"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    strict: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

reviewSchema.pre(/^find/, function (this: mongoose.Query<any, IReview>, next) {
  this.populate({
    path: "user",
    select: "firstName",
  })
  next()
})

const Review: Model<IReview> = mongoose.model<IReview>("Review", reviewSchema)

export default Review
