import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import { createOne, deleteOne, getAll, updateOne } from "./handlerFactory"
import Cart from "../models/cartModel"
import User from "../models/userModel"
import cartItem from "../models/cartItemModel"
import { Types } from "mongoose"
import Product from "../models/productModel"

export const getAllCarts = getAll(Cart)

export const getCartById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cart = await Cart.findById(req.params.id)

    if (!cart) {
      return next(new AppError("No cart found with that ID", 404))
    }

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    })
  }
)

export const createCart = createOne(Cart)

export const updateCart = updateOne(Cart)

export const deleteCart = deleteOne(Cart)

export const addToCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId, quantity, chosenColor } = req.body
    const userId = req.user.id

    if (!productId || !chosenColor) {
      return next(new AppError("Missing productId or chosenColor", 400))
    }

    const product = await Product.findById(productId)
    if (!product) {
      console.log("cant find product")
      return next(new AppError("Cant find given product", 404))
    }

    // 1. Get user and their cart
    const user = await User.findById(userId).populate("cart")
    if (!user || !user.cart) {
      return next(new AppError("User or cart not found", 404))
    }

    const cart = await Cart.findById(user.cart).populate("items")
    if (!cart) {
      return next(new AppError("Cart not found", 404))
    }

    // 2. Check if item exists in cart
    let existingItem = null
    for (const itemId of cart.items as Types.ObjectId[]) {
      const item = await cartItem.findById(itemId)
      if (
        item?.productId.toString() === productId &&
        item?.chosenColor === chosenColor
      ) {
        existingItem = item
        break
      }
    }

    if (existingItem) {
      // 3A. Item exists: increment quantity
      existingItem.quantity += quantity
      await existingItem.save()
    } else {
      // 3B. Item doesn't exist: create new CartItem
      const newItem = await cartItem.create({
        productId,
        quantity,
        chosenColor,
      })

      cart.items.push(newItem._id)
    }

    // 4. (Optional) Update cart totalPrice here if needed

    // 5. Save cart
    await cart.save()

    res.status(200).json({
      message: "Item added to cart",
      cart,
    })
  }
)

export const removeFromCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.body
    const userId = req.user.id

    if (!productId) {
      return next(new AppError("Missing productId", 400))
    }

    // 1. Get user and their cart
    const user = await User.findById(userId).populate("cart")
    if (!user || !user.cart) {
      return next(new AppError("User or cart not found", 404))
    }

    const cart = await Cart.findById(user.cart).populate("items")
    if (!cart) {
      return next(new AppError("Cart not found", 404))
    }

    // 2. Find the cart item to remove
    const itemIndex = (cart.items as Types.ObjectId[]).findIndex(
      async (itemId) => {
        const item = await cartItem.findById(itemId)
        return item && item.productId.toString() === productId
      }
    )

    // Remove the item if found
    let removed = false
    for (let i = 0; i < (cart.items as Types.ObjectId[]).length; i++) {
      const item = await cartItem.findById(cart.items[i])
      if (item && item.productId.toString() === productId) {
        await cartItem.findByIdAndDelete(item._id)
        ;(cart.items as Types.ObjectId[]).splice(i, 1)
        removed = true
        break
      }
    }

    if (!removed) {
      return next(new AppError("Item not found in cart", 404))
    }

    // 3. Save cart
    await cart.save()

    res.status(200).json({
      message: "Item removed from cart",
      cart,
    })
  }
)

export const getMyCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id

    const cart = await Cart.findOne({ user: userId }).populate("items")

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "Cart not found",
      })
    }

    res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    })
  }
)
