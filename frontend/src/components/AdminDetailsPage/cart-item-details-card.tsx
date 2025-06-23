import { CartItemType } from "@/types/carts"

export default function CartItemDetailsCard({
  cartItem,
}: {
  cartItem: CartItemType
}) {
  return (
    <div className="border rounded-lg p-3 mb-2">
      <div className="flex items-center justify-between">
        <div>
          <h2>{cartItem.name}</h2>
          <h2>{cartItem.quantity}</h2>
        </div>
        <h2 className="ml-4">{cartItem.price}</h2>
      </div>
    </div>
  )
}
