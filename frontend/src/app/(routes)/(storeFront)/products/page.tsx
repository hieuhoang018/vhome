"use client"

import { useEffect, useState } from "react"
import ProductCard from "@/components/ProductsListingPage/product-card"
import Link from "next/link"
import api from "@/lib/axios"
import { Product, ProductsResponse } from "@/types/products"
import { useSearchParams } from "next/navigation"

const itemsPerPage = 8

export default function ProductListing() {
  const [products, setProducts] = useState<Product[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get("page") || "1")
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get<ProductsResponse>("/products", {
          params: { page, limit: itemsPerPage },
        })
        setProducts(res.data.data.products)
        setTotalItems(res.data.results)
      } catch (err) {
        console.error("Fetch error:", err)
        setError("Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page])

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-30 pb-16">
        <div className="bg-beige-yellow py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mb-4">
              Our Collection
            </h1>
            <p className="text-furniture-charcoal/70 max-w-2xl">
              Discover our carefully curated selection of modern furniture
              pieces designed to transform your living space.
            </p>
          </div>
        </div>
        <div className="container flex mx-auto px-4 gap-3 mt-6">
          <input
            className="flex-[3] border border-gray-300 rounded-md px-3.5 py-1 bg-beige-yellow"
            type="text"
            placeholder="Search products..."
          />
          <select className="flex-1 border border-gray-300 rounded-md px-3.5 py-1">
            <option value="">All</option>
            <option value="bedroom">Bedroom</option>
            <option value="living-room">Living Room</option>
          </select>
          <select className="flex-1 border border-gray-300 rounded-md px-3.5 py-1">
            <option value="">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="container mx-auto px-4 mt-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1
            return (
              <Link
                key={pageNum}
                href={`?page=${pageNum}`}
                className={`px-4 py-2 border rounded ${
                  page === pageNum ? "bg-navi-blue text-white" : "bg-white"
                }`}
              >
                {pageNum}
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
