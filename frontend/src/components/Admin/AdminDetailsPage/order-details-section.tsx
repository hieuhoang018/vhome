"use client"

import api from "@/lib/axios"
import { Order, OrderResponse } from "@/types/orders"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ItemDetailsCard from "./item-details-card"
import { toast } from "sonner"

export default function OrderDetailsSection() {
  const [order, setOrders] = useState<Order>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const { id: _id } = useParams<{ id: string }>()
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get<OrderResponse>(`/orders/${_id}`)
        setOrders(res.data.data.order)
      } catch (err) {
        console.log(err)
        setError("Failed to load order")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [_id])

  const handleDeleteOrder = async () => {
    try {
      await api.delete(`/orders/${_id}`)
      toast.success("Order deleted")
      router.push("/lookup")
    } catch (error) {
      console.log(error)
      toast.error("Error while deleting order")
    }
  }

  if (error || !order) {
    return <p>Error while loading order</p>
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Order Information</h1>
          <h2>Order ID</h2>
          <h2 className="mb-4">{order._id}</h2>
          <h2>Customer</h2>
          <h2 className="mb-4">
            {order.user.firstName} {order.user.lastName} (ID: {order.user._id})
          </h2>
          <h2>Order Date</h2>
          <h2 className="mb-4">
            {new Date(order.createdAt).toLocaleDateString()}
          </h2>
          <h2>Status</h2>
          <h2 className="mb-4">Delivered</h2>
          <h2>Total Amount</h2>
          <h2 className="mb-4">{order.totalPrice}</h2>
        </div>
        <div className="flex-1 border rounded-lg bg-gray-100 p-5">
          <h1 className="text-2xl font-bold mb-8">Shipping & Payment</h1>
          <h2>Shipping Address</h2>
          <h2 className="mb-4">Opiskelijankatu 4</h2>
          <h2>Payment Method</h2>
          <h2 className="mb-4">Card</h2>
        </div>
      </div>
      <div className="border rounded-lg bg-gray-100 p-5">
        <h1 className="text-2xl font-bold mb-8">Order Items</h1>
        {order.items.map((item) => (
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
            Edit Order
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            type="button"
            disabled={loading}
            onClick={handleDeleteOrder}
          >
            Delete Order
          </button>
        </div>
      </div>
    </>
  )
}
