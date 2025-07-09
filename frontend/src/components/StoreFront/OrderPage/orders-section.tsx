"use client"

import api from "@/lib/axios"
import { Order, OrdersResponse } from "@/types/orders"
import { useEffect, useState } from "react"
import OrderCard from "./order-card"
import axios from "axios"
import { useUser } from "@/context/userContext"

export default function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const res = await api.get<OrdersResponse>("/users/me/orders")
        console.log(res)
        setOrders(res.data.data.docs)
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {!user ? (
        <p>Not logged in! Please log in</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : !orders || orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => {
          return <OrderCard key={order._id} order={order} />
        })
      )}
    </div>
  )
}
