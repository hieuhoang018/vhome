import mongoose from "mongoose"
import cartItem from "./cartItemModel"

const cartSchema = new mongoose.Schema({
  items: [cartItem],
  totalPrice: Number,
})

const cart = mongoose.model("Cart", cartSchema)
