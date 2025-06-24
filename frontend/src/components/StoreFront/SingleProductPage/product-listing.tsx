"use client"

import type { Product, ProductResponse } from "@/types/products"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Plus, Minus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import api from "@/lib/axios"

export default function ProductListingSection() {
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [amountChosen, setAmountChosen] = useState(1)
  const { id: _id } = useParams<{ id: string }>()

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

  if (loading) {
    return <p>Loading...</p>
  }

  if (error || !product) {
    return <p className="text-red-600">Failed to load product...</p>
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
      <div className="grid grid-cols-2 mt-5">
        <Image
          src={product.imageUrl}
          alt="image"
          width={610}
          height={1}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-7xl font-serif mb-10">{product.name}</h1>
          <h2 className="text-3xl mb-9">€{product.price}</h2>
          <p className="text-xl mb-9">{product.description}</p>
          <h2 className="text-2xl font-serif mb-2">Select color</h2>
          <div className="flex gap-1 mb-9">
            {product.colors.map((color) => {
              return (
                <button className="border rounded-lg px-3.5 py-1" key={color}>
                  <p className="text-2xl font-serif">{color}</p>
                </button>
              )
            })}
          </div>
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
            <button className="flex-[2] rounded-lg px-4 py-2 w-full bg-navi-blue text-white">
              Add to cart
            </button>
            <button className="flex-1 border rounded-lg px-4 py-2 w-full">
              Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
