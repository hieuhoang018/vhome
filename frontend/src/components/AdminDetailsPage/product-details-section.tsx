"use client"

import api from "@/lib/axios"
import { Product, ProductResponse } from "@/types/products"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProductDetailsSection() {
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { id: _id } = useParams<{ id: string }>()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get<ProductResponse>(`/products/${_id}`)
        setProduct(res.data.data.product)
      } catch (err) {
        setError("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [])

  if (error) {
    return <p>Error while loading product</p>
  }

  return (
    <>
      <div className="flex gap-4 mb-4">
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Personal Information</h1>
          <h2>Name</h2>
          <h2 className="mb-4">{product?.name}</h2>
          <h2>Category</h2>
          <h2 className="mb-4">{product?.category}</h2>
          <h2>Price</h2>
          <h2 className="mb-4">{product?.price}</h2>
        </div>
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Inventory & Status</h1>
          <h2>Created At</h2>
          <h2 className="mb-4">
            {product?.createdAt
              ? new Date(product.createdAt).toLocaleDateString()
              : "undefine"}
          </h2>
          <h2>Stock</h2>
          <h2 className="mb-4">{product?.stock}</h2>
          <h2>Status</h2>
          <h2 className="mb-4">
            {product?.stock === 0 ? "Out of Stock" : "In Stock"}
          </h2>
        </div>
      </div>
      <div className="border rounded-lg bg-gray-100 p-5">
        <h1 className="text-2xl font-bold mb-8">Description</h1>
        <h2 className="mb-4">{product?.description}</h2>
      </div>
      <div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            type="button"
            disabled={loading}
          >
            Edit Product
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            type="button"
            disabled={loading}
          >
            Delete Product
          </button>
        </div>
      </div>
    </>
  )
}
