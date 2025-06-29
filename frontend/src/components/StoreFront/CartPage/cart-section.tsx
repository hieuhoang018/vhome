"use client"

import { useUser } from "@/context/userContext"
import api from "@/lib/axios"
import { CartResponse, Cart } from "@/types/carts"
import { useEffect, useState } from "react"
import CartItem from "./cart-item"
import Link from "next/link"

export default function CartSection() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [cart, setCart] = useState<Cart>()
  const { user } = useUser()

  useEffect(() => {
    if (!user) return // Don't fetch cart if not logged in

    const fetchCart = async () => {
      setLoading(true)
      try {
        const res = await api.get<CartResponse>("/users/me/cart")
        setCart(res.data.data.doc)
      } catch (err) {
        console.error("Fetch error:", err)
        setError("Failed to load cart")
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [user])

  if (!user) return <p>Not logged in. Please sign in.</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (loading) return <p>Loading cart...</p>

  return (
    <div className="container mx-auto px-4 mt-6">
      {!cart?.items || cart?.items.length === 0 ? (
        <p>no products yet</p>
      ) : (
        <div className="flex">
          <div className="flex-[2] flex flex-col gap-6">
            {cart.items.map((item) => {
              return <CartItem key={item.name} product={item} />
            })}
          </div>
          <div className="flex-1 border rounded-md p-4 max-h-[500px] overflow-y-auto self-start">
            <h1 className="font-bold text-2xl mb-6">Order Summary</h1>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  placeholder="Enter code"
                  type="text"
                  className="flex-4 border rounded-md px-2 py-1"
                />
                <button className="flex-1 border rounded-md px-2 py-1">
                  Apply
                </button>
              </div>
              <p className="text-xs text-furniture-charcoal/60 mt-1">
                Try "WELCOME10" for 10% off
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal items</span>
                <span>$100</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$20</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>€{cart.totalPrice}</span>
                </div>
              </div>
              <button className="w-full py-2 border rounded-md mb-4">
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <Link href="/products">
                <button className="w-full py-2 border rounded-md">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
