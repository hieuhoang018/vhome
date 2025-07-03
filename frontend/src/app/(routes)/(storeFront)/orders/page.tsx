import OrdersSection from "@/components/StoreFront/OrderPage/orders-section"
import { TitleCardWrapper } from "@/components/StoreFront/storefront-wrappers"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function OrdersPage() {
  return (
    <>
      <TitleCardWrapper>
        <Link
          href={"/profile"}
          className="text-furniture-charcoal/70 max-w-2xl flex items-center hover:text-red-500 mb-4"
        >
          <ArrowLeft className="h-4" />
          <span>Back to Settings</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-furniture-charcoal mb-4">
          My Orders
        </h1>
        <p className="text-furniture-charcoal/70 max-w-2xl">
          Track and manage your order history
        </p>
      </TitleCardWrapper>
      <div className="container mx-auto px-4 mt-6">
        <OrdersSection />
      </div>
    </>
  )
}
