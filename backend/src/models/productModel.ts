import mongoose, { Types } from "mongoose"

export enum Category {
  LivingRoom = "Living Room",
  Bedroom = "Bedroom",
  Bathroom = "Bathroom",
  Office = "Office",
  Outdoor = "Outdoor",
  DiningRoom = "Dining Room",
}

export interface IProduct {
  _id: Types.ObjectId
  name: string
  category: Category
  price: number
  description: string
  stock: number
  imageUrl: string
  colors: string[]
  ratingQuantity: number
  rating: number
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product must have a name"],
      unique: true,
    },
    category: {
      type: String,
      enum: Object.values(Category),
      required: [true, "Product must have a category"],
    },
    price: {
      type: Number,
      required: [true, "Product must have a price"],
    },
    description: {
      type: String,
      required: [true, "Product must have a description"],
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: [true, "Product must have an image"],
    },
    colors: {
      type: [String],
      default: [],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val: number) => Math.round(val * 10) / 10,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

productSchema.index({ price: 1 })

productSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "product",
  localField: "_id",
})

const Product = mongoose.model<IProduct>("Product", productSchema)

export default Product
