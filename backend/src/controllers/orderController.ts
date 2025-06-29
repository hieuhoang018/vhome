import Stripe from "stripe"
import catchAsync from "../utils/catchAsync"
import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/appError"
import Cart from "../models/cartModel"
import Order from "../models/orderModel"

export const getCheckoutSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    const user = req.user
    if (!user) return next(new AppError("Cant find user", 404))

    const cart = await Cart.findById(user.cart)
    if (!cart || !cart.items.length)
      return next(new AppError("Cart is empty or not found", 404))

    const line_items = cart.items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          // images: [item.product.image], // Uncomment if you have image URLs
        },
        unit_amount: Math.round(item.price * 100), // price in cents
      },
      quantity: item.quantity,
    }))

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${req.protocol}://${req.get(
        "host"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get("host")}/cancel`,
      customer_email: req.user.email,
      client_reference_id: req.params.cartId,
    })

    res.status(200).json({
      status: "success",
      session,
    })
  }
)

export const createOrderCheckout = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
  const { session_id } = req.query;

  if (!session_id) {
    return next(new AppError("Session ID is required", 400));
  }

  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  stripeInstance.checkout.sessions
    .retrieve(session_id as string)
    .then(async (session) => {
      if (!session || session.payment_status !== "paid") {
        return next(new AppError("Payment not completed", 400));
      }

      // Here you would create the order in your database.
      // Example:
      const order = await Order.create({
        user: req.user._id,
        cart: req.user.cart,
        totalPrice: session.amount_total,
        paymentIntentId: session.payment_intent,
      });

      res.status(201).json({
        status: "success",
        message: "Order created successfully",
        order,
      });
    })
    .catch((err) => next(new AppError("Invalid session", 400)));
})
