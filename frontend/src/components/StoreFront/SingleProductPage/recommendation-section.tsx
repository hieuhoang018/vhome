"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import api from "@/lib/axios"
import { Product } from "@/types/products"
import Image from "next/image"
import axios from "axios"

export default function CompleteTheRoom({ productId }: { productId: string }) {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await api.get<{ results: Product[] }>(
          "/recommend/complete-room",
          { params: { productId } }
        )
        if (!cancelled) setItems(res.data.results || [])
      } catch (err) {
        if (axios.isAxiosError(err)) {
        setError(err.response?.data.message)
      }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [productId])

  if (loading) return <div className="mt-10 text-sm text-gray-500">Loading complementary items…</div>
  if (error || items.length === 0) return null

  return (
    <section className="mt-12 mb-20">
      <h3 className="mb-3 text-3xl">Complete the room</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <Link
            key={item._id}
            href={`/products/${item._id}`}
            className="min-w-[220px] max-w-[220px] border rounded-lg p-3 hover:shadow transition"
          >
            <div className="bg-gray-100 overflow-hidden rounded">
              <Image
                src={item.imageCoverUrl}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">{item.category}</div>
            <div className="font-medium line-clamp-2">{item.name}</div>
            <div className="text-gray-800">€{item.price.toFixed(2)}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}
