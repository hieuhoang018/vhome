"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import api from "@/lib/axios"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SuccessContent() {
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
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="mb-8">
        <CheckCircle className="h-20 w-20 mx-auto text-green-500" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mb-10">
        <h1 className="text-5xl font-bold">Thank you for your order!</h1>
        <p className="text-2xl">
          Your payment has been processed successfully and your order is
          confirmed.
        </p>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center border rounded-lg min-w-150 p-5">
        <h1 className="text-3xl">Order Confirmation</h1>
        <div className="flex flex-col items-center justify-center rounded-lg min-w-135 p-3 bg-gray-300">
          <h2 className="text-xl mb-2">Order Number</h2>
          <h3 className="font-bold text-2xl">#123 345677</h3>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-xl">Estimated Delivery</h3>
          <p className="text-xl font-semibold">3-5 business days</p>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <Link href={"/orders"}>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            View Orders
          </button>
        </Link>
        <Link href={"/products"}>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  )
}
