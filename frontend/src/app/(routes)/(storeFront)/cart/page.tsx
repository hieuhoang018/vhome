import CartSection from "@/components/StoreFront/CartPage/cart-section"
import { TitleCardWrapper } from "@/components/StoreFront/storefront-wrappers"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  return (
    <>
      {/* BANNER */}
      <TitleCardWrapper>
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
      </TitleCardWrapper>

      {/* MAIN CART SECTION */}
      <CartSection />
    </>
  )
}
