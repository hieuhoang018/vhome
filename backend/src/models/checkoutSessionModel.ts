import mongoose from "mongoose"

export interface CheckoutSession {
  user: mongoose.Types.ObjectId
  email: string
  firstName: string
  lastName: string
  phone: string
  address: {
    streetAddress: string
    city: string
    zip: number
  }
  deliveryNotes?: string
  stripeSessionId?: string
}

const checkoutSessionSchema = new mongoose.Schema<CheckoutSession>(
  {
    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: Number, required: true },
    },
    deliveryNotes: { type: String },
    stripeSessionId: { type: String },
  },
  { timestamps: true }
)

const CheckoutSession = mongoose.model("CheckoutSession", checkoutSessionSchema)

export default CheckoutSession
