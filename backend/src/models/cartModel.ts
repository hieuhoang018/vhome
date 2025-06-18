import { Schema, model, Types, HydratedDocument } from "mongoose"

export interface ICart {
  _id: Types.ObjectId
  user?: Types.ObjectId
  items: Types.ObjectId[]
  totalPrice: number
}

export type CartDocument = HydratedDocument<ICart>

const cartSchema = new Schema<ICart>({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: false,
  },
  items: {
    type: [Schema.ObjectId],
    ref: "CartItem",
    default: [],
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
})

const Cart = model<ICart>("Cart", cartSchema)

export default Cart
