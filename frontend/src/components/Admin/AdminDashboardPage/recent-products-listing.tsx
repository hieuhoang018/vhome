"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"
import { Product, ProductsResponse } from "@/types/products"
import { Edit, Eye, Trash2 } from "lucide-react"

export default function RecentProductsListing() {
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get<ProductsResponse>("/products", {
        params: {
          limit: 5,
          sort: "-createdAt",
          fields: "name,price,category,stock",
        },
      })
      setProducts(res.data.data.docs)
    }

    fetchProducts()
  }, [])
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left py-3 px-4 font-medium text-gray-600">
            Product
          </th>
          <th className="text-left py-3 px-4 font-medium text-gray-600 hidden xl:table-cell">
            Category
          </th>
          <th className="text-left py-3 px-4 font-medium text-gray-600">
            Price
          </th>
          <th className="text-left py-3 px-4 font-medium text-gray-600 hidden xl:table-cell">
            Stock
          </th>
          <th className="text-left py-3 px-4 font-medium text-gray-600">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
          <tr key={product._id} className="border-b hover:bg-gray-50">
            <td className="py-3 px-4">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-furniture-charcoal">
                  {product.name}
                </span>
              </div>
            </td>
            <td className="py-3 px-4 text-gray-600 hidden xl:table-cell">
              {product.category}
            </td>
            <td className="py-3 px-4 font-semibold text-furniture-charcoal">
              {product.price}
            </td>
            <td className="py-3 px-4 text-gray-600 hidden xl:table-cell">
              {product.stock}
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
