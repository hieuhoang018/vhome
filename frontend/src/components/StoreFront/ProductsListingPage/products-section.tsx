"use client"

import type { Product, ProductsResponse } from "@/types/products"
import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import api from "@/lib/axios"
import ProductCard from "./product-card"
import { useUpdateQueryParams } from "@/hooks/useUpdateQueryParams"
import PaginationControl from "./pagination-control"
import axios from "axios"

export default function ProductsSection() {
  const itemsPerPage = 16
  const [products, setProducts] = useState<Product[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const searchParams = useSearchParams()
  const updateParams = useUpdateQueryParams()

  const page = parseInt(searchParams.get("page") || "1")
  const sort = searchParams.get("sort") || ""
  const category = searchParams.get("category") || ""

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await api.get<ProductsResponse>("/products", {
          params: {
            page,
            sort,
            limit: itemsPerPage,
            category,
          },
        })
        setProducts(res.data.data.docs)
        setTotalItems(res.data.total)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page, sort, category])

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="flex-[3] border border-gray-300 rounded-md px-3.5 py-1 bg-beige-yellow"
          type="text"
          placeholder="Search products..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateParams({
                search: (e.target as HTMLInputElement).value,
                page: "1",
              })
            }
          }}
        />

        <select
          className="flex-1 border border-gray-300 rounded-md px-3.5 py-1"
          value={category}
          onChange={(e) =>
            updateParams({ category: e.target.value, page: "1" })
          }
        >
          <option value="">All</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Living Room">Living Room</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Office">Office</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Dining Room">Dining Room</option>
        </select>

        <select
          className="flex-1 border border-gray-300 rounded-md px-3.5 py-1"
          value={sort}
          onChange={(e) => updateParams({ sort: e.target.value, page: "1" })}
        >
          <option value="">Featured</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
        </select>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <PaginationControl
              currentPage={page}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </div>
    </>
  )
}
