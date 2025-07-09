"use client"

import type { Product, ProductResponse } from "@/types/products"
import { useState, useEffect } from "react"
import { Plus, Minus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import api from "@/lib/axios"
import ColorSelection from "./color-selection"
import { toast } from "sonner"
import ReviewForm from "./review-form"
import ReviewListing from "./reviews-listing"
import ImageSlider from "./image-slider"
import axios from "axios"

export default function ProductListingSection() {
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [amountChosen, setAmountChosen] = useState(1)
  const { id: _id } = useParams<{ id: string }>()
  const [chosenColor, setChosenColor] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get<ProductResponse>(`/products/${_id}`)
        setProduct(res.data.data.product)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [_id])

  const handleAddToCart = async () => {
    try {
      const chosenProduct = {
        productId: product?._id,
        quantity: amountChosen,
        chosenColor,
      }
      if (chosenColor === null) {
        toast.error("Please choose a color")
      } else {
        await api.post("/users/me/cart", chosenProduct)
        toast.success("Item added to cart")
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message)
      }
    }
  }

  const handleAddToWishlist = async () => {
    try {
      await api.post("/users/me/wishlist", {
        productId: product?._id,
      })
      toast.success("Item added to wishlist")
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data.message)
      }
    }
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error || !product) {
    return <p className="text-red-600">{error}</p>
  }
  return (
    <>
      <nav className="flex items-center text-sm">
        <Link href="/" className="hover:text-red-500">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-red-500">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium">{product.name}</span>
      </nav>
      <Link
        href="/products"
        className="inline-flex items-center mt-4 hover:underline underline-offset-3 text-gray-500"
      >
        <ArrowLeft className="h-4" />
        Back to shopping
      </Link>
      <div className="flex flex-col md:flex-row gap-8 mt-5 mb-20">
        <ImageSlider product={product} />
        <div className="flex-1">
          <h1 className="text-7xl font-serif mb-10">{product.name}</h1>
          <h2 className="text-3xl mb-9">€{product.price}</h2>
          <p className="text-xl mb-9">{product.description}</p>
          <h2 className="text-2xl font-serif mb-2">Select color</h2>
          <ColorSelection
            colorList={product.colors}
            chosenColor={chosenColor}
            setChosenColor={setChosenColor}
          />
          <div className="mb-5">
            <h3 className="font-medium mb-2">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded-md w-32">
              <button
                onClick={() => setAmountChosen(amountChosen - 1)}
                disabled={amountChosen === 1}
                className="px-3 py-1 text-furniture-charcoal hover:bg-gray-200 disabled:text-gray-400"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex-1 text-center font-medium">
                {product.stock === 0 ? 0 : amountChosen}
              </div>
              <button
                onClick={() => setAmountChosen(amountChosen + 1)}
                disabled={amountChosen === product.stock || product.stock === 0}
                className="px-3 py-1 text-furniture-charcoal hover:bg-gray-200 disabled:text-gray-400"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-furniture-charcoal/70 mt-2">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-[2] rounded-lg px-4 py-2 w-full bg-navi-blue disabled:bg-gray-400 text-white hover:bg-navi-blue/90 hover:cursor-pointer"
            >
              Add to cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex-1 border rounded-lg px-4 py-2 w-full hover:bg-gray-200 hover:cursor-pointer"
            >
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
      <ReviewForm productId={_id} />
      <ReviewListing product={product} />
    </>
  )
}
