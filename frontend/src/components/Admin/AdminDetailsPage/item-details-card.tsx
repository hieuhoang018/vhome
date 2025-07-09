import { CartItemType } from "@/types/carts"
import { OrderItem } from "@/types/orders"

export default function ItemDetailsCard({
  item,
}: {
  item: CartItemType | OrderItem
}) {
  return (
    <div className="border rounded-lg p-3 mb-2">
      <div className="flex items-center justify-between">
        <div>
          <h2>{item.name}</h2>
          <h2>{item.quantity}</h2>
        </div>
        <h2 className="ml-4">€{item.price}</h2>
      </div>
    </div>
  )
}
