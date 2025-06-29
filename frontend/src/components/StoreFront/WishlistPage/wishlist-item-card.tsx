import { WishlistItemType } from "@/types/wishlist"
import { Trash2 } from "lucide-react"

export default function WishlistItemCard({
  product,
}: {
  product: WishlistItemType
}) {
  return (
    <div className="h-130 w-100 border border-gray-400 rounded-lg overflow-hidden relative">
      <button
        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        aria-label="Remove"
      >
        <Trash2 />
      </button>
      <div className="h-90"></div>
      <div className="p-4 flex flex-col gap-2">
        <h1>{product.name}</h1>
        <h1>{product.price}</h1>
        <div className="flex w-full gap-2">
          <button className="flex-1 border py-3 rounded-lg">Add to Cart</button>
          <button className="flex-1 border py-3 rounded-lg">Details</button>
        </div>
      </div>
    </div>
  )
}
