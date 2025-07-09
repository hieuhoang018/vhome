"use client"

import { useFormSubmit } from "@/hooks/useFormSubmit"
import api from "@/lib/axios"
import { Product, ProductsResponse } from "@/types/products"
import { Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>()
  const { formData, handleChange, handleSubmit, loading } = useFormSubmit({
    initialData: {
      prompt: "",
    },
    onSubmit: async (data) => {
      const res = await api.get<ProductsResponse>(
        `/products?search=${data.prompt}`
      )
      if (res.data.data.docs.length === 0) {
        toast.info("No products found")
      }
      setProducts(res.data.data.docs)
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
            <th className="hidden md:table-cell text-left py-3 px-4 font-medium text-gray-600">
              ID
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Name
            </th>
            <th className="hidden xl:table-cell text-left py-3 px-4 font-medium text-gray-600">
              Category
            </th>
            <th className="hidden md:table-cell text-left py-3 px-4 font-medium text-gray-600">
              Price
            </th>
            <th className="hidden xl:table-cell text-left py-3 px-4 font-medium text-gray-600">
              Stock
            </th>
            <th className="hidden xl:table-cell text-left py-3 px-4 font-medium text-gray-600">
              Status
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-50">
              <td className="hidden md:table-cell py-3 px-4 text-gray-600">
                {product._id}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-furniture-charcoal">
                    {product.name}
                  </span>
                </div>
              </td>
              <td className="hidden xl:table-cell py-3 px-4 text-gray-600">
                {product.category}
              </td>
              <td className="hidden md:table-cell py-3 px-4 font-semibold text-furniture-charcoal">
                €{product.price}
              </td>
              <td className="hidden xl:table-cell py-3 px-4 font-semibold text-furniture-charcoal">
                {product.stock}
              </td>
              <td className="hidden xl:table-cell py-3 px-4 text-gray-600">
                {product.stock === 0 ? "Out of Stock" : "In Stock"}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <button className="h-8 w-8">
                    <Link href={`/details/product/${product._id}`}>
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
