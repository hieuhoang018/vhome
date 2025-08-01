"use client"

import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import { Cart, CartsResponse } from "@/types/carts"
import { Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function CartsTab() {
  const [carts, setCarts] = useState<Cart[]>()
  const { formData, handleChange, handleSubmit, loading } = useFormSubmit({
    initialData: {
      prompt: "",
    },
    onSubmit: async (data) => {
      const res = await api.get<CartsResponse>(`/carts?search=${data.prompt}`)
      console.log(res)
      if (res.data.data.docs.length === 0) {
        toast.info("No carts found")
      }
      setCarts(res.data.data.docs)
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
          placeholder="Search cart by user name or cart ID..."
          className="flex-9 mr-2 p-2 border rounded-lg"
        />
        <button
          className="flex-1 border rounded-lg hover:bg-gray-200 hover:cursor-pointer"
          type="submit"
          disabled={loading}
        >
          Search
        </button>
      </form>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="hidden md:table-cell text-left py-3 px-4 font-medium text-gray-600">
              Cart ID
            </th>
            <th className="hidden xl:table-cell text-left py-3 px-4 font-medium text-gray-600">
              User ID
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              User Name
            </th>
            <th className="hidden xl:table-cell text-left py-3 px-4 font-medium text-gray-600">
              Items
            </th>
            <th className="hidden md:table-cell text-left py-3 px-4 font-medium text-gray-600">
              Total
            </th>
            <th className="hidden xl:table-cell text-left py-3 px-4 font-medium text-gray-600">
              Last Updated
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {carts?.map((cart) => (
            <tr key={cart._id} className="border-b hover:bg-gray-50">
              <td className="hidden md:table-cell py-3 px-4 text-gray-600">{cart._id}</td>
              <td className="hidden xl:table-cell py-3 px-4">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-furniture-charcoal">
                    {cart.user.id ? cart.user.id : ""}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-600">
                {cart.user.firstName} {cart.user.lastName}
              </td>
              <td className="hidden xl:table-cell py-3 px-4 font-semibold text-furniture-charcoal">
                {cart.items.length}
              </td>
              <td className="hidden md:table-cell py-3 px-4 font-semibold text-furniture-charcoal">
                €{cart.totalPrice}
              </td>
              <td className="hidden xl:table-cell py-3 px-4 text-gray-600">
                {new Date(cart.updatedAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <button className="h-8 w-8 flex items-center rounded-lg justify-center hover:cursor-pointer hover:bg-gray-200">
                    <Link href={`/details/cart/${cart._id}`}>
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
