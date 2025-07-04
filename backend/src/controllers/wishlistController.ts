import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import { AppError } from "../utils/appError"
import Product from "../models/productModel"
import Wishlist, { WishlistItem } from "../models/wishlistModel"
import { getMyOne } from "./handlerFactory"

export const addToWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.body
    const userId = req.user.id

    const wishlist = await Wishlist.findOne({ user: userId }).populate("items")
    if (!wishlist) {
      return next(new AppError("Wishlist not found", 404))
    }

    const product = await Product.findById(productId)
    if (!product) {
      return next(new AppError("Product not found", 404))
    }

    const name = product.name
    const price = product.price

    const existingItem = wishlist.items.find(
      (item: WishlistItem) => item.name === name
    )

    if (existingItem) return next(new AppError("Item already in wishlist", 400))

    const newItem = {
      productId,
      name,
      price,
    }

    wishlist.items.push(newItem)

    await wishlist.save()

    res.status(200).json({
      status: "success",
      data: {
        wishlist,
      },
    })
  }
)

export const removeFromWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const productId  = req.params.id
    const userId = req.user.id
    if (!productId) {
      return next(new AppError("Missing productId", 400))
    }

    const wishlist = await Wishlist.findOne({ user: userId }).populate("items")
    if (!wishlist) {
      return next(new AppError("Wishlist not found", 404))
    }

    const itemIndex = wishlist.items.findIndex(
      (item: WishlistItem) => item.productId.toString() === productId
    )

    if (itemIndex === -1) {
      return next(new AppError("Item not found in wishlist", 404))
    }

    wishlist.items.splice(itemIndex, 1)

    await wishlist.save()

    res.status(200).json({
      message: "Item removed from wishlist",
      wishlist,
    })
  }
)

export const getMyWishlist = getMyOne(Wishlist)
