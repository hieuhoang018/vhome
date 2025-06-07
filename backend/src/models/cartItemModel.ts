import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  quantity: Number,
  color: String,
})

const cartItem = mongoose.model("CartItem", cartItemSchema)

export default cartItem