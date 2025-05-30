import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have a name"],
    unique: true,
  },
  category: {
    type: String,
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

const Product = mongoose.model("Product", productSchema)

export default Product
