import CartItem from "@/components/CartPage/cart-item"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const mockData = [
    {
      name: "Nagiqu Desk",
      category: "Office",
      price: 457.15,
      description:
        "Perfect for small or large office spaces, this office desk is built to maximize style and usability.",
      stock: 18,
      imageUrl: "https://via.placeholder.com/300x200?text=Nagiqu+Desk",
      colors: ["Gray", "Beige", "Red"],
    },
    {
      name: "Tugoja Desk",
      category: "Office",
      price: 350.46,
      description:
        "Upgrade your office with this modern office desk, designed to meet both form and function.",
      stock: 28,
      imageUrl: "https://via.placeholder.com/300x200?text=Tugoja+Desk",
      colors: ["Black", "Red", "Gray"],
    },
    {
      name: "Qewixe Table",
      category: "Outdoor",
      price: 870.65,
      description:
        "Upgrade your outdoor with this modern outdoor table, designed to meet both form and function.",
      stock: 21,
      imageUrl: "https://via.placeholder.com/300x200?text=Qewixe+Table",
      colors: ["Yellow", "White"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-30 pb-16">
        {/* BANNER */}
        <div className="bg-beige-yellow py-12">
          <div className="container mx-auto px-4">
            <Link
              href={"/products"}
              className="text-furniture-charcoal/70 max-w-2xl flex items-center hover:text-red-500"
            >
              <ArrowLeft className="h-4" />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mt-4">
              Shopping Cart
            </h1>
          </div>
        </div>
        {/* MAIN CART SECTION */}
        <div className="container mx-auto px-4 mt-6">
          {!mockData || mockData.length === 0 ? (
            <p>no products yet</p>
          ) : (
            <div className="flex">
              <div className="flex-[2] flex flex-col gap-6">
                {mockData.map((item) => {
                  return <CartItem key={item.name} product={item} />
                })}
              </div>
              <div className="flex-1 border rounded-md p-4 max-h-[500px] overflow-y-auto self-start">
                <h1 className="font-bold text-2xl mb-6">Order Summary</h1>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      placeholder="Enter code"
                      type="text"
                      className="flex-4 border rounded-md px-2 py-1"
                    />
                    <button className="flex-1 border rounded-md px-2 py-1">
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-furniture-charcoal/60 mt-1">
                    Try "WELCOME10" for 10% off
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal items</span>
                    <span>$100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$20</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>$120</span>
                    </div>
                  </div>
                  <button className="w-full py-2 border rounded-md mb-4">
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping */}
                  <Link href="/products">
                    <button className="w-full py-2 border rounded-md">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
