import { TitleCardWrapper } from "@/components/StoreFront/storefront-wrappers"
import WishlistItemSection from "@/components/StoreFront/WishlistPage/wishlist-items-section"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function WishlistPage() {
  return (
    <>
      <TitleCardWrapper>
        <Link
          href={"/products"}
          className="text-furniture-charcoal/70 max-w-2xl flex items-center hover:text-red-500"
        >
          <ArrowLeft className="h-4" />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mb-4 mt-4">
          My Wishlist
        </h1>
        <p className="text-furniture-charcoal/70 max-w-2xl">
          3 items saved for later
        </p>
      </TitleCardWrapper>
      <WishlistItemSection />
    </>
  )
}
