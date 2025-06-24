"use client"

import { useState } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import { CartItemType } from "@/types/carts"
import Link from "next/link"

export default function CartItem({ product }: { product: CartItemType }) {
  const [amountChosen, setAmountChosen] = useState(1)

  return (
    <div className="w-[95%] h-40 border rounded-md flex p-2 space-x-3">
      <div className="bg-red-500 flex-1"></div>
      <div className="flex-5 flex flex-col justify-center">
        <Link
          href={`/products/${product.productId}`}
          className="text-2xl font-semibold mb-1"
        >
          {product.name}
        </Link>
        <h2 className="mb-4">€{product.price}</h2>
        <h2>Color: {product.chosenColor}</h2>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center border border-gray-300 rounded-md w-32 mb-3">
          <button
            onClick={() => setAmountChosen(product.quantity - 1)}
            disabled={product.quantity === 1}
            className="px-3 py-1 text-furniture-charcoal disabled:text-gray-400"
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="flex-1 text-center font-medium">
            {product.quantity}
          </div>
          <button
            onClick={() => setAmountChosen(product.quantity + 1)}
            className="px-3 py-1 text-furniture-charcoal disabled:text-gray-400"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button>
          <Trash2 />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="font-bold">
          €{Math.round(product.price * product.quantity * 100) / 100}
        </p>
      </div>
    </div>
  )
}
