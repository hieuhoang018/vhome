import mongoose from "mongoose"

export interface orderItem {
  productId: mongoose.Types.ObjectId
  name: string
  quantity: number
  price: number
  chosenColor: string
}

const orderItemSchema = new mongoose.Schema<orderItem>(
  {
    productId: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    chosenColor: { type: String, required: true },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      default: [],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Orders must belong to a user"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Orders must have a total price"],
    },
    paid: {
      type: Boolean,
      default: true,
    },
    paymentIntentId: {
      type: String,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
)

orderSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.populate({ path: "user", select: "firstName lastName" })
  next()
})

const Order = mongoose.model("Order", orderSchema)

export default Order
