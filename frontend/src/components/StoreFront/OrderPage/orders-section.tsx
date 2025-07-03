"use client"

import api from "@/lib/axios"
import { Order, OrdersResponse } from "@/types/orders"
import { useEffect, useState } from "react"
import OrderCard from "./order-card"

export default function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get<OrdersResponse>("/users/me/orders")
        console.log(res)
        setOrders(res.data.data.docs)
      } catch (error) {
        setError("Failed to fetch orders")
      }
    }

    fetchOrders()
  }, [])

  if (!orders) {
    return <p>Error</p>
  }

  return (
    <>
      {orders.map((order) => {
        return <OrderCard key={order._id} order={order} />
      })}
    </>
  )
}
