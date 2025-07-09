"use client"

import api from "@/lib/axios"
import { OrdersResponse } from "@/types/orders"
import { ProductsResponse } from "@/types/products"
import { RevenueResponse } from "@/types/revenue"
import { UsersResponse } from "@/types/users"
import { useEffect, useState } from "react"

export default function StatisticsBlock({
  title,
  apiEndpoint,
}: {
  title: string
  apiEndpoint: string
}) {
  const [data, setData] = useState<number>()

  useEffect(() => {
    const fetchData = async () => {
      if (title === "Total Revenue") {
        const res = await api.get<RevenueResponse>(`${apiEndpoint}`)
        setData(res.data.results)
      } else {
        const res = await api.get<
          ProductsResponse | UsersResponse | OrdersResponse
        >(`${apiEndpoint}`)
        setData(res.data.total)
      }
    }

    fetchData()
  }, [apiEndpoint])

  return (
    <div className="border rounded-lg bg-gray-100 p-4">
      <h1 className="text-2xl">{title}</h1>
      <h2 className="font-bold text-3xl">
        {apiEndpoint === "/orders/revenue" ? "€ " : ""}
        {data}
      </h2>
    </div>
  )
}
