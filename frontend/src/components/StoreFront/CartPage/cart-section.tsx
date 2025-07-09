"use client"

import { useUser } from "@/context/userContext"
import api from "@/lib/axios"
import { Cart, CurrentCartResponse } from "@/types/carts"
import { useEffect, useState } from "react"
import CartItem from "./cart-item"
import Link from "next/link"
import axios from "axios"

export default function CartSection() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [cart, setCart] = useState<Cart>()
  const { user } = useUser()

  const refreshCart = async () => {
    setLoading(true)
    try {
      const res = await api.get<CurrentCartResponse>("/users/me/cart")
      setCart(res.data.data.doc)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!user) return

    refreshCart()
  }, [user])

  return (
    <div className="container mx-auto px-4 mt-6">
      {!user ? (
        <p>Not logged in. Please sign in.</p>
      ) : loading ? (
        <p>Loading cart...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : !cart?.items || cart?.items.length === 0 ? (
        <p>no products yet</p>
      ) : (
        <div className="flex flex-col lg:flex-row flex-wrap gap-3">
          <div className="flex-[2] flex flex-col gap-6">
            {cart.items.map((item) => {
              return (
                <CartItem
                  key={`${item.name} ${item.chosenColor}`}
                  product={item}
                  onRemove={refreshCart}
                  onQuantityChange={refreshCart}
                />
              )
            })}
          </div>
          <div className="flex-1 border rounded-md p-4 max-h-[500px] overflow-y-auto self-start w-full lg:w-auto">
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
                Try &quot;WELCOME10&quot; for 10% off
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
              <Link href={"/checkout"}>
                <button className="w-full py-2 border rounded-md mb-4">
                  Proceed to Checkout
                </button>
              </Link>

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
