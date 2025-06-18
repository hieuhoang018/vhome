import mongoose, { Model, Types } from "mongoose";

export interface ICartItem {
  productId: Types.ObjectId
  quantity: number
  chosenColor: string
}

const cartItemSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  chosenColor: String,
})

const cartItem: Model<ICartItem> = mongoose.model<ICartItem>("CartItem", cartItemSchema)

export default cartItem