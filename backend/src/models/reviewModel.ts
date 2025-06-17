import mongoose, { Model, Types } from "mongoose"
import Product from "./productModel"

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

reviewSchema.statics.calcAverageRatings = async function (
  productId: Types.ObjectId
) {
  const stats = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        avgRating: { $avg: "$rating" },
        nRating: { $sum: 1 },
      },
    },
  ])

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingQuantity: stats[0].nRating,
      rating: stats[0].avgRating,
    })
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingQuantity: 0,
      rating: 0,
    })
  }

  return stats.length > 0
    ? { avgRating: stats[0].avgRating, nRating: stats[0].nRating }
    : { avgRating: 0, nRating: 0 }
}

reviewSchema.index({ product: 1, user: 1 }, { unique: true })

reviewSchema.post("save", async function (doc, next) {
  await (this.constructor as any).calcAverageRatings(doc.product)
  next()
})

reviewSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await (doc.constructor as any).calcAverageRatings(doc.product)
  }
})

reviewSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    await (doc.constructor as any).calcAverageRatings(doc.product)
  }
})

const Review: Model<IReview> = mongoose.model<IReview>("Review", reviewSchema)

export default Review
