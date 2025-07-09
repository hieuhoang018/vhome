"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { CartItemType } from "@/types/carts"
import Link from "next/link"
import api from "@/lib/axios"
import { useDebouncedPatchQuantity } from "@/hooks/useDebouncedPatchQuantity"
import { toast } from "sonner"

export default function CartItem({
  product,
  onRemove,
  onQuantityChange,
}: {
  product: CartItemType
  onRemove: () => void
  onQuantityChange: () => void
}) {
  const { quantity: amountChosen, setQuantity: setAmountChosen } =
    useDebouncedPatchQuantity({
      initialQuantity: product.quantity,
      updateItemId: product.productId,
      chosenColor: product.chosenColor,
      onSuccess: onQuantityChange,
    })

  const handleRemoveFromCart = async () => {
    try {
      await api.delete(`/users/me/cart/${product.productId}`)
      toast.success("Item removed from cart")
      onRemove()
    } catch (error) {
      console.log(error)
      toast.error("Failed to remove item from cart")
    }
  }

  return (
    <div className="w-[95%] h-auto md:h-40 border rounded-md flex flex-col md:flex-row p-2 space-y-3 md:space-y-0 md:space-x-3">
      {/* Image placeholder */}
      <div className="bg-red-500 w-full md:w-1/5 h-32 md:h-auto rounded"></div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-center">
        <Link
          href={`/products/${product.productId}`}
          className="text-xl md:text-2xl font-semibold mb-1"
        >
          {product.name}
        </Link>
        <h2 className="mb-2 md:mb-4 text-sm md:text-base">€{product.price}</h2>
        <h2 className="text-sm md:text-base">Color: {product.chosenColor}</h2>
      </div>

      {/* Quantity & Remove */}
      <div className="flex items-center md:flex-col justify-between md:justify-center md:space-y-2">
        <div className="flex items-center border border-gray-300 rounded-md w-32">
          <button
            onClick={() => setAmountChosen(amountChosen - 1)}
            disabled={amountChosen === 1}
            className="px-3 py-1 text-furniture-charcoal disabled:text-gray-400"
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="flex-1 text-center font-medium">{amountChosen}</div>
          <button
            onClick={() => setAmountChosen(amountChosen + 1)}
            className="px-3 py-1 text-furniture-charcoal disabled:text-gray-400"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <button onClick={handleRemoveFromCart} className="mt-2 md:mt-0">
          <Trash2 />
        </button>
      </div>

      {/* Total Price */}
      <div className="flex items-center justify-center md:justify-end">
        <p className="font-bold text-lg">
          €{Math.round(product.price * amountChosen * 100) / 100}
        </p>
      </div>
    </div>
  )
}
