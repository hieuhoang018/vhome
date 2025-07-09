"use client"

import { useEffect, useState } from "react"
import WishlistItemCard from "./wishlist-item-card"
import { Wishlist, WishlistResponse } from "@/types/wishlist"
import { useUser } from "@/context/userContext"
import api from "@/lib/axios"
import axios from "axios"

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
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 mt-6">
      {!user ? (
        <p>Not logged in. Please sign in.</p>
      ) : loading ? (
        <p>Loading wishlist...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : !wishlist?.items || wishlist?.items.length === 0 ? (
        <p>No items yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
