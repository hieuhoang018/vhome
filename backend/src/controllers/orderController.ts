import Stripe from "stripe"
import catchAsync from "../utils/catchAsync"
import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/appError"
import Cart, { CartItem } from "../models/cartModel"
import Order from "../models/orderModel"
import { createOne, deleteOne, getAll, updateOne } from "./handlerFactory"

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
      success_url: `${process.env.FRONTEND_URL}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/orders/cancel`,
      customer_email: user.email,
      client_reference_id: user.cart.toString(),
    })

    res.status(200).json({
      status: "success",
      session,
    })
  }
)

export const createOrderCheckout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { session_id } = req.query

    if (!session_id) {
      return next(new AppError("Session ID is required", 400))
    }

    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    const session = await stripeInstance.checkout.sessions.retrieve(
      session_id as string
    )

    if (!session || session.payment_status !== "paid") {
      return next(new AppError("Payment not completed", 400))
    }

    // retrieve cart using client_reference_id
    const cartId = session.client_reference_id
    const cart = await Cart.findById(cartId).populate("items")

    if (!cart) {
      return next(new AppError("Cart not found", 404))
    }

    // create order with cart items embedded
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map((item: CartItem) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        chosenColor: item.chosenColor,
      })),
      totalPrice: session.amount_total! / 100, // Stripe returns in cents
      paid: true,
      paymentIntentId: session.payment_intent as string,
    })

    // clear the cart
    cart.items = []
    cart.totalPrice = 0
    await cart.save()

    res.status(201).json({
      status: "success",
      message: "Order created successfully",
      order,
    })
  }
)

export const getAllOrders = getAll(Order)
export const createOrder = createOne(Order)
export const deleteOrder = deleteOne(Order)
export const updateOrder = updateOne(Order)

export const getOrderById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return next(new AppError("No order found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        order,
      },
    })
  }
)
