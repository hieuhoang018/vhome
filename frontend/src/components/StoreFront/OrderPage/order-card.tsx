import { Order, OrderItem } from "@/types/orders"

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex justify-between p-4 bg-beige-yellow">
        <div>
          <h1 className="text-2xl">Order {order._id}</h1>
          <h2 className="text-gray-400">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </h2>
        </div>
        <div className="ml-auto text-right">
          <h1>Total</h1>
          <h2 className="text-2xl font-semibold">{order.totalPrice}</h2>
        </div>
      </div>
      <div className="flex flex-col gap-3 p-4">
        {order.items.map((item: OrderItem) => {
          return (
            <div
              key={`${item.name} ${item.chosenColor}`}
              className="flex flex-row gap-3"
            >
              <div className="w-20 h-20 border"></div>
              <div>
                <h1 className="text-xl mb-1 font-semibold">{item.name}</h1>
                <h2>Quantity: {item.quantity}</h2>
                <h2>Chosen color: {item.chosenColor}</h2>
              </div>
              <h1 className="ml-auto self-center text-right font-semibold">
                {item.price}
              </h1>
            </div>
          )
        })}
      </div>
      <hr className="border-t mx-4" />
      <div className="p-4">
        <h1>Shipping Information</h1>
        <h2>{order.address.streetAddress}, {order.address.city} {order.address.zip}</h2>
        <h2>{order.phone ? `${order.phone}` : "No phone number"}</h2>
      </div>
    </div>
  )
}
