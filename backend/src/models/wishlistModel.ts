import { Schema, model, Types, HydratedDocument } from "mongoose"

export type WishlistDocument = HydratedDocument<IWishlist>

export interface IWishlist {
  _id: Types.ObjectId
  user?: Types.ObjectId
  items: WishlistItem[]
}

export interface WishlistItem {
  productId: Types.ObjectId
  name: string
  price: number
}

const wishlistItemSchema = new Schema<WishlistItem>(
  {
    productId: Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
)

const wishlistSchema = new Schema<IWishlist>({
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: false,
  },
  items: {
    type: [wishlistItemSchema],
    default: [],
  },
})

const Wishlist = model<IWishlist>("Wishlist", wishlistSchema)

export default Wishlist
