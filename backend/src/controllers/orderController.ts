import Stripe from "stripe"
import catchAsync from "../utils/catchAsync"
import { NextFunction, Request, Response } from "express"
import { AppError } from "../utils/appError"
import Cart, { CartItem } from "../models/cartModel"
import Order from "../models/orderModel"
import { createOne, deleteOne, getAll, updateOne } from "./handlerFactory"
import Product from "../models/productModel"
import CheckoutSession from "../models/checkoutSessionModel"

export const createCheckoutSession = catchAsync(async (req, res, next) => {
  const {
    email,
    firstName,
    lastName,
    phone,
    streetAddress,
    city,
    zip,
    deliveryNotes,
  } = req.body

  const user = req.user
  if (!user) return next(new AppError("User not found", 404))

  const cart = await Cart.findById(user.cart)
  if (!cart || !cart.items.length)
    return next(new AppError("Cart is empty", 400))

  // create CheckoutSession in DB
  const checkoutSession = await CheckoutSession.create({
    user: user._id,
    email,
    firstName,
    lastName,
    phone,
    address: { streetAddress, city, zip },
    deliveryNotes,
  })

  // Create Stripe session
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

  const line_items = cart.items.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    success_url: `${process.env.FRONTEND_URL}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/orders/cancel`,
    customer_email: email,
    client_reference_id: user.cart.toString(),
  })

  // store Stripe session id
  checkoutSession.stripeSessionId = session.id
  await checkoutSession.save()

  res.status(200).json({
    status: "success",
    session,
  })
})

export const createOrderCheckout = catchAsync(async (req, res, next) => {
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

  const cartId = session.client_reference_id
  const cart = await Cart.findById(cartId).populate("items")

  if (!cart) {
    return next(new AppError("Cart not found", 404))
  }

  // find CheckoutSession
  const checkoutSession = await CheckoutSession.findOne({
    stripeSessionId: session.id,
  })
  if (!checkoutSession) {
    return next(new AppError("Checkout session data not found", 404))
  }

  // update stock
  for (const item of cart.items) {
    const product = await Product.findById(item.productId)
    if (!product) {
      return next(new AppError(`Product not found: ${item.productId}`, 404))
    }
    if (product.stock < item.quantity) {
      return next(new AppError(`Insufficient stock for ${product.name}`, 400))
    }
    product.stock -= item.quantity
    await product.save()
  }

  // create the Order
  const order = await Order.create({
    user: req.user._id,
    items: cart.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      chosenColor: item.chosenColor,
    })),
    totalPrice: session.amount_total! / 100,
    paid: true,
    paymentIntentId: session.payment_intent as string,
    phone: checkoutSession.phone,
    address: checkoutSession.address,
    deliveryNotes: checkoutSession.deliveryNotes,
  })

  // clear the cart
  cart.items = []
  cart.totalPrice = 0
  await cart.save()

  // optionally remove the checkout session to clean up
  await CheckoutSession.deleteOne({ _id: checkoutSession._id })

  res.status(201).json({
    status: "success",
    message: "Order created successfully",
    order,
  })
})

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

export const getMyOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user) {
      return next(new AppError("Cant find User", 404))
    }

    const orders = await Order.find({ user: user.id })
    if (!orders) {
      return next(new AppError("Errors while fetching orders", 500))
    }

    res.status(200).json({
      status: "success",
      data: {
        docs: orders,
      },
    })
  }
)

export const getTotalRevenue = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    const paymentIntents = await stripe.paymentIntents.list({
      limit: 100, // adjust if needed
    })

    const totalRevenue = paymentIntents.data
      .filter((pi) => pi.status === "succeeded")
      .reduce((sum, pi) => sum + (pi.amount_received ?? 0), 0)

    res.status(200).json({
      status: "success",
      results: totalRevenue / 100, // convert to EUR
    })
  }
)
