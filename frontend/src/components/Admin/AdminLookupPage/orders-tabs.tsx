"use client"

import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import { Order, OrdersResponse } from "@/types/orders"
import { Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>()
  const { formData, handleChange, handleSubmit, loading } =
    useFormSubmit({
      initialData: {
        prompt: "",
      },
      onSubmit: async (data) => {
        const res = await api.get<OrdersResponse>(
          `/orders?search=${data.prompt}`
        )
        if(res.data.data.docs.length === 0) {
          toast.info("No orders found")
        }
        setOrders(res.data.data.docs)
      },
    })

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full mb-6">
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
          placeholder="Search product by name..."
          className="flex-9 mr-2 p-2 border rounded-lg"
        />
        <button
          className="flex-1 border rounded-lg"
          type="submit"
          disabled={loading}
        >
          Search
        </button>
      </form>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              ID
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              User ID
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              User Name
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Date
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Status
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Total
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Items
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order) => (
            <tr key={order._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-600">{order._id}</td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-furniture-charcoal">
                    {order.user._id ? order.user._id : "undefined"}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600">
                {order.user.firstName} {order.user.lastName}
              </td>
              <td className="py-3 px-4 font-semibold text-furniture-charcoal">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 font-semibold text-furniture-charcoal">
                Delivered
              </td>
              <td className="py-3 px-4 text-gray-600">{order.totalPrice}</td>
              <td className="py-3 px-4 text-gray-600">{order.items.length}</td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <button className="h-8 w-8">
                    <Link href={`/details/order/${order._id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
