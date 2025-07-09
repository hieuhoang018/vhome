"use client"

import api from "@/lib/axios"
import { Cart, CartResponse } from "@/types/carts"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ItemDetailsCard from "./item-details-card"
import { toast } from "sonner"

export default function CartDetailsSection() {
  const [cart, setCart] = useState<Cart>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { id: _id } = useParams<{ id: string }>()

  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get<CartResponse>(`/carts/${_id}`)
        console.log(res)
        setCart(res.data.data.cart)
      } catch (err) {
        console.log(err)
        setError("Failed to load cart")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [_id])

  const handleDeleteCart = async () => {
    try {
      await api.delete(`/carts/${_id}`)
      toast.success("Cart deleted")
      router.push("/lookup")
    } catch (error) {
      console.log(error)
      toast.error("Error while deleting cart")
    }
  }

  if (error || !cart) {
    return <p>Error while loading cart</p>
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Cart Information</h1>
          <h2 className="font-medium">Cart ID</h2>
          <h2 className="mb-4">{cart._id}</h2>
          <h2 className="font-medium">User</h2>
          <h2 className="mb-4">
            {cart.user.firstName} {cart.user.lastName} (ID: {cart.user.id})
          </h2>
          <h2 className="font-medium">Total Items</h2>
          <h2 className="mb-4">{cart.items.length}</h2>
          <h2 className="font-medium">Total Amount</h2>
          <h2 className="mb-4">€{cart.totalPrice}</h2>
        </div>
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Cart Details</h1>
          <h2 className="font-medium">Last Updated</h2>
          <h2 className="mb-4">
            {cart.createdAt
              ? new Date(cart.updatedAt).toLocaleDateString()
              : "undefine"}
          </h2>
        </div>
      </div>
      <div className="border rounded-lg bg-gray-100 p-5">
        <h1 className="text-2xl font-bold mb-5">Cart Items</h1>
        {cart.items.map((item) => (
          <ItemDetailsCard
            key={`${item.name} ${item.chosenColor}`}
            item={item}
          />
        ))}
      </div>
      <div>
        <div className="flex gap-4 mt-6">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            type="button"
            disabled={loading}
          >
            Edit Cart
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            type="button"
            disabled={loading}
            onClick={handleDeleteCart}
          >
            Delete Cart
          </button>
        </div>
      </div>
    </>
  )
}
