"use client"

import api from "@/lib/axios"
import { ProductsResponse } from "@/types/products"
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
      const res = await api.get<ProductsResponse | UsersResponse>(
        `${apiEndpoint}`
      )
      setData(res.data.results)
    }

    fetchData()
  }, [])

  return (
    <div className="border rounded-lg bg-gray-100 p-4">
      <h1 className="text-2xl">{title}</h1>
      <h2 className="font-bold text-3xl">{data}</h2>
    </div>
  )
}
