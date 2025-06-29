import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.ObjectId,
      ref: "Cart",
      required: [true, "Orders must belong to a cart"],
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
      default: undefined
    }
  },
  {
    timestamps: true,
  }
)

orderSchema.pre(/^find/, function (this: mongoose.Query<any, any>, next) {
  this.populate("user").populate("cart")
  next()
})

const Order = mongoose.model("Order", orderSchema)

export default Order
