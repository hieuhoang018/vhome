import api from "@/lib/axios"
import { WishlistItemType } from "@/types/wishlist"
import axios from "axios"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function WishlistItemCard({
  product,
  onRemove,
}: {
  product: WishlistItemType
  onRemove: () => void
}) {
  const handleRemoveFromWishlist = async () => {
    try {
      await api.delete(`/users/me/wishlist/${product.productId}`)
      toast.success("Item removed from wishlist")
      onRemove()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
      }
    }
  }

  return (
    <div className="h-130 max-w-100 border border-gray-400 rounded-lg overflow-hidden relative transition-transform duration-200 hover:-translate-y-1">
      <button
        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        aria-label="Remove"
        onClick={handleRemoveFromWishlist}
      >
        <Trash2 />
      </button>
      <div className="h-90"></div>
      <div className="p-4 flex flex-col gap-2">
        <h1>{product.name}</h1>
        <h1>{product.price}</h1>
        <Link href={`/products/${product.productId}`}>
          <button className="w-full border py-3 rounded-lg hover:bg-gray-200">Details</button>
        </Link>
      </div>
    </div>
  )
}
