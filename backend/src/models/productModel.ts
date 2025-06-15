import mongoose, { Types } from "mongoose"

export enum Category {
  LivingRoom = "Living Room",
  Bedroom = "Bedroom",
  Bathroom = "Bathroom",
  Office = "Office",
  Outdoor = "Outdoor",
  DiningRoom = "Dining Room",
}

export interface IProduct extends Document {
  _id: Types.ObjectId
  name: string
  category: Category
  price: number
  description: string
  stock: number
  imageUrl: string
  colors: string[]
}

const productSchema = new mongoose.Schema<IProduct>({
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
})

const Product = mongoose.model<IProduct>("Product", productSchema)

export default Product
