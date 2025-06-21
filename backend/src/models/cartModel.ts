import { Schema, model, HydratedDocument, Types } from "mongoose"

export type CartDocument = HydratedDocument<ICart>

export interface ICart {
  _id: Types.ObjectId
  user?: Types.ObjectId
  items: CartItem[]
  totalPrice: number
}

export interface CartItem {
  productId: Types.ObjectId
  name: string
  quantity: number
  price: number
  chosenColor: string
}

const cartItemSchema = new Schema<CartItem>(
  {
    productId: Types.ObjectId,
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    chosenColor: { type: String, required: true },
  },
  { _id: false }
)

const cartSchema = new Schema<ICart>({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: false,
  },
  items: {
    type: [cartItemSchema],
    default: [],
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
})

const Cart = model<ICart>("Cart", cartSchema)

export default Cart
