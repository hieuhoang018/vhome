"use client"

import { useEffect, useState } from "react"
import WishlistItemCard from "./wishlist-item-card"
import { Wishlist, WishlistResponse } from "@/types/wishlist"
import { useUser } from "@/context/userContext"
import api from "@/lib/axios"

export default function WishlistItemSection() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [wishlist, setWishlist] = useState<Wishlist>()
  const { user } = useUser()

  useEffect(() => {
    if (!user) return

    refreshWishlist()
  }, [user])

  const refreshWishlist = async () => {
    setLoading(true)
    try {
      const res = await api.get<WishlistResponse>("/users/me/wishlist")
      setWishlist(res.data.data.doc)
    } catch (err) {
      console.error("Fetch error:", err)
      setError("Failed to load wishlist")
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <p>Not logged in. Please sign in.</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (loading) return <p>Loading wishlist...</p>

  return (
    <div className="container mx-auto px-4 mt-6">
      {!wishlist?.items || wishlist?.items.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {wishlist.items.map((item) => {
            return (
              <WishlistItemCard
                key={item.name}
                product={item}
                onRemove={refreshWishlist}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
