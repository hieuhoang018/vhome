import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import { createOne, deleteOne, getAll, updateOne } from "./handlerFactory"
import Cart, { CartItem } from "../models/cartModel"
import User from "../models/userModel"
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

    const product = await Product.findById(productId)
    if (!product) {
      return next(new AppError("Product not found", 404))
    }

    if (!product.colors || !product.colors.includes(chosenColor)) {
      return next(
        new AppError("Chosen color is not available for this product", 400)
      )
    }

    if (quantity > product.stock)
      return next(
        new AppError("Requested quantity exceeds available stock", 400)
      )

    if (quantity < 1) return next(new AppError("Invalid quantity", 400))

    const name = product.name
    const price = product.price

    // 2. Find user cart
    const cart = await Cart.findOne({ user: userId }).populate("items")
    if (!cart) {
      return next(new AppError("Cart not found", 404))
    }

    // Check if there is an existing item with the same name and chosenColor
    const existingItem = cart.items.find(
      (item: CartItem) => item.name === name && item.chosenColor === chosenColor
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      // 4B. Create new CartItem
      const newItem = {
        productId,
        name,
        price,
        quantity,
        chosenColor,
      }

      cart.items.push(newItem)
    }

    cart.totalPrice = cart.items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    )

    // 5. Save cart
    await cart.save()

    // 6. Re-fetch cart with full item/product data if needed
    const updatedCart = await Cart.findById(cart._id)

    res.status(200).json({
      status: "success",
      message: "Item added to cart",
      data: {
        cart: updatedCart,
      },
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

    console.log("got to here")
    const itemIndex = cart.items.findIndex(
      (item: CartItem) => item.productId.toString() === productId.toString()
    )

    if (itemIndex === -1) {
      return next(new AppError("Item not found in cart", 404))
    }
    // Update the cart totalPrice before removing the item
    cart.totalPrice -=
      cart.items[itemIndex].price * cart.items[itemIndex].quantity
    if (cart.totalPrice < 0) cart.totalPrice = 0

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1)

    // Save the updated cart
    await cart.save()

    res.status(200).json({
      message: "Item removed from cart",
      cart,
    })
  }
)

export const updateCartItemQuantity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id
    const { updateItemId, quantity } = req.body

    const user = await User.findById(userId).populate("cart")
    if (!user || !user.cart) {
      return next(new AppError("User or cart not found", 404))
    }

    const cart = await Cart.findById(user.cart).populate("items")
    if (!cart) {
      return next(new AppError("Cart not found", 404))
    }

    const itemIndex = cart.items.findIndex(
      (item: CartItem) => item.productId.toString() === updateItemId
    )

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        error: "Item not found in cart",
      })
    }

    if (quantity === 0) {
      // Remove the item if quantity is 0
      cart.items.splice(itemIndex, 1)
    } else {
      // Update the quantity if greater than 0
      cart.items[itemIndex].quantity = quantity
    }

    cart.totalPrice = cart.items.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    )

    // Save the updated cart
    const updatedCart = await cart.save()

    res.json({
      success: true,
      data: updatedCart,
      message:
        quantity === 0
          ? "Item removed from cart successfully"
          : "Cart item quantity updated successfully",
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
