"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"
import { Edit, Eye, Trash2 } from "lucide-react"
import { Order, OrdersResponse } from "@/types/orders"

export default function RecentOrdersListing() {
  const [orders, setOrders] = useState<Order[]>()

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get<OrdersResponse>("/orders", {
        params: {
          limit: 5,
          sort: "-createdAt",
          fields: "user,items,totalPrice",
        },
      })
      setOrders(res.data.data.docs)
    }

    fetchProducts()
  }, [])
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4 font-medium text-gray-600">
            User Name
          </th>
          <th className="text-left py-3 px-4 font-medium text-gray-600 xl:table-cell hidden">
            Items
          </th>
          <th className="text-left py-3 px-4 font-medium text-gray-600">
            Total Price
          </th>
          <th className="text-left py-3 px-4 font-medium text-gray-600 xl:table-cell hidden">
            Status
          </th>
          <th className="text-left py-3 px-4 font-medium text-gray-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order) => (
          <tr key={order._id} className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-furniture-charcoal">
                  {order.user.firstName} {order.user.lastName}
                </span>
              </div>
            </td>
            <td className="py-3 px-4 text-gray-600 xl:table-cell hidden">
              {order.items.length}
            </td>
            <td className="py-3 px-4 font-semibold text-furniture-charcoal">
              {order.totalPrice}
            </td>
            <td className="py-3 px-4 text-gray-600 xl:table-cell hidden">
              Delivered
            </td>
            <td className="py-3 px-4">
              <div className="flex items-center space-x-2">
                <button className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
