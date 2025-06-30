"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import api from "@/lib/axios"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const session_id = searchParams.get("session_id")

  useEffect(() => {
    if (session_id) {
      api
        .get(`/orders/checkout/success?session_id=${session_id}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Order created", res.data)
          // you can redirect or show details here
        })
        .catch((err) => console.error(err))
    }
  }, [session_id])

  return (
    <div>
      <h1>Payment confirmed!</h1>
      <p>Thank you for your order.</p>
    </div>
  )
}
