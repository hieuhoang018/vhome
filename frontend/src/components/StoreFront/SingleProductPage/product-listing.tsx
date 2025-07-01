"use client"

import type { Product, ProductResponse } from "@/types/products"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Plus, Minus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import api from "@/lib/axios"
import ColorSelection from "./color-selection"

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
        setError("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = async () => {
    try {
      const res = await api.post("/users/me/cart", {
        productId: product?._id,
        quantity: amountChosen,
        chosenColor,
      })
      console.log(res.status)
    } catch (error) {
      console.log(error)
      setError("Failed to add to cart")
    }
  }

  const handleAddToWishlist = async () => {
    try {
      const res = await api.post("/users/me/wishlist", {
        productId: product?._id,
      })
      console.log(res.status)
    } catch (error) {
      console.log(error)
      setError("Failed to add to wishlist")
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
      <div className="grid grid-cols-2 gap-8 mt-5">
        {/* <Image
          src={product.imageCoverUrl}
          alt="image"
          width={610}
          height={1}
          className="rounded-lg"
        /> */}
        <div className="bg-red-500"></div>
        <div>
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
                className="px-3 py-1 text-furniture-charcoal disabled:text-gray-400"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex-1 text-center font-medium">
                {amountChosen}
              </div>
              <button
                onClick={() => setAmountChosen(amountChosen + 1)}
                disabled={amountChosen === product.stock}
                className="px-3 py-1 text-furniture-charcoal disabled:text-gray-400"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-furniture-charcoal/70 mt-2">
              {product.stock} in stock
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-[2] rounded-lg px-4 py-2 w-full bg-navi-blue text-white hover:cursor-pointer"
            >
              Add to cart
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex-1 border rounded-lg px-4 py-2 w-full hover:cursor-pointer"
            >
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
