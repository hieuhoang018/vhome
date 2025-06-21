import CartSection from "@/components/CartPage/cart-section"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
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
        <CartSection />
      </main>
    </div>
  )
}
